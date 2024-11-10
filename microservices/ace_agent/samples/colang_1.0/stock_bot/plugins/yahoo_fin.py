# Copyright(c) 2023 NVIDIA Corporation. All rights reserved.

# NVIDIA Corporation and its licensors retain all intellectual property
# and proprietary rights in and to this software, related documentation
# and any modifications thereto.Any use, reproduction, disclosure or
# distribution of this software and related documentation without an express
# license agreement from NVIDIA Corporation is strictly prohibited.

from yahoo_fin import stock_info as si
import requests
import logging
from typing import Optional
from fastapi import APIRouter

# API to extract stock price
Y_TICKER = "https://query2.finance.yahoo.com/v1/finance/search"
Y_FINANCE = "https://query1.finance.yahoo.com/v7/finance/quote?symbols="

router = APIRouter()
logger = logging.getLogger("plugin")

logger.info("Starting stock plugin server")

# Prepare headers for requests
session = requests.Session()
user_agent = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
)
session.headers.update({"User-Agent": user_agent})


def get_ticker_symbol_alphavantage(stock_name: str) -> Optional[str]:
    # We do not need actual api key to get ticker info
    # But it is required as place holder
    api_key = "YOUR_ALPHA_VANTAGE_API_KEY"
    url = f"https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords={stock_name}&apikey={api_key}"
    response = requests.get(url)
    data = response.json()

    if "bestMatches" in data and len(data["bestMatches"]) > 0:
        ticker_symbol = data["bestMatches"][0]["1. symbol"]
        return ticker_symbol

    return None


@router.get("/get_ticker")
def get_ticker(company_name: str) -> Optional[str]:
    """
    Take company name returns ticker symbol used for trading
    param
        Args:
            company_name: company name like Microsoft
        Returns:
            Ticker Symbol used for trading like MSFT for microsoft
    """
    logger.info(f"Getting ticker symbol for {company_name}")
    try:
        params = {"q": company_name, "quotes_count": 1, "country": "United States"}
        return session.get(url=Y_TICKER, params=params).json()["quotes"][0]["symbol"]
    except Exception as e:
        logger.error(f"Exception {e} while fetching ticker symbol for {company_name}")
        return get_ticker_symbol_alphavantage(company_name)


@router.get("/get_stock_price")
def get_stock_price(company_name: str) -> Optional[float]:
    """
    get a stock price from yahoo finance api
    """

    logger.info(f"Getting stock price for {company_name}")
    try:
        # Find ticker symbol for stock name, eg. Microsoft : MSFT, Nvidia: NVDA
        logger.info(f"Extracting ticker symbol for {company_name}")
        ticker = get_ticker(company_name)

        live_price = si.get_live_price(ticker)

        logger.info(f"Live Price for {ticker}: {round(live_price, 2)}")
        return round(live_price, 2)

    except ValueError:
        # If ticker is not available update status detail
        logger.error(f"Unable to find stock information of {company_name}")
        return None
    except Exception as e:
        logger.error(f"Unable to find stock price of {company_name}")
        return None
