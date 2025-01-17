# Copyright (c) 2023, NVIDIA CORPORATION.  All rights reserved.
#
# NVIDIA CORPORATION and its licensors retain all intellectual property
# and proprietary rights in and to this software, related documentation
# and any modifications thereto.  Any use, reproduction, disclosure or
# distribution of this software and related documentation without an express
# license agreement from NVIDIA CORPORATION is strictly prohibited.

import json
from fastapi import APIRouter
from typing import Dict, Optional, List, Any
from parameters import param
from traceback import print_exc
import logging

router = APIRouter()

logger = logging.getLogger("plugin")


def log(what: str):
    """Log compatible with the nemoguardrails log output to show output as part of logging output"""
    logger.info(f"A Colang debug info: {what}")


@router.post("/get_prompt")
def get_prompt(
    query: Optional[str] = "",
    context: Optional[Dict[str, Any]] = {},
    conv_history: Optional[List[Dict[str, str]]] = [],
) -> str:
    """
    This stub accepts a query, conversation history and any dynamic context if available.
    It formulates the custom instuctions section of the prompt using these bot's instructions and returns it
    """

    try:
        print(f"Generating LLM prompt. Current conversation history: {conv_history}")
        character_details = {}

        # Get the character specific default values
        character_details = param.get("slm_responder", {}).copy()
        # Override default character details if context is passed dynamically
        for llm_param in [
            "instructions",
            "quality",
            "toxicity",
            "humour",
            "creativity",
            "violence",
            "helpfulness",
            "inappropriate",
        ]:
            character_details[llm_param] = context.get(llm_param, character_details[llm_param])

        character_details["player_name"] = context.get("player_name")

        logger.info(f"Forming Prompt with parameters: {json.dumps(character_details, indent=4)}")
        return formulate_custom_instructions(character_details=character_details, conv_history=conv_history)

    except Exception as e:
        print(f"Error : {e}")
        print_exc()
    return ""


def get_param_val(params, key, default):
    if key in params.keys():
        return params[key]
    else:
        return default


def formulate_custom_instructions(character_details: Dict[str, Any], conv_history: List[Dict[str, str]]) -> str:
    """Formulate the custom instructions for the prompt based on the passed context and conversation history"""

    if not character_details:
        return ""

    conversation = []

    # Prompt structure
    # <extra_id_0>System
    # [system prompt]
    #
    # <extra_id_1>[user name]
    # [user message]
    # <extra_id_2>quality:<value 0-9>,toxicity:<value 0-9>,humor:<value 0-9>,creativity:<value 0-9>,violence:<value 0-9>,helpfulness:<value 0-9>,not_appropriate:<value 0-9>
    instructions = get_param_val(character_details, "instructions", "")
    llm_quality = get_param_val(character_details, "quality", 9)
    llm_toxicity = get_param_val(character_details, "toxicity", 0)
    llm_humor = get_param_val(character_details, "humor", 2)
    llm_creativity = get_param_val(character_details, "creativity", 3)
    llm_violence = get_param_val(character_details, "violence", 0)
    llm_helpfulness = get_param_val(character_details, "helpfulness", 9)
    llm_inappropriate = get_param_val(character_details, "inappropriate", 0)
    curr_prompt = f"""<extra_id_1>User \n{instructions}"""
    # Formulate the prompt based on conversation history
    for hist in conv_history:
        if hist.get("role") == "user":
            conversation.append(f"<extra_id_1>{character_details.get('player_name')}")
            conversation.append(hist.get("content"))
        elif hist.get("role") == "assistant":
            conversation.append(
                f"<extra_id_1>quality:{llm_quality},toxicity:{llm_toxicity},humor:{llm_humor},creativity:{llm_creativity},violence:{llm_violence},helpfulness:{llm_helpfulness},not_appropriate:{llm_inappropriate}"
            )
            conversation.append(hist.get("content"))
        else:
            continue

    conversation.append(
        f"<extra_id_1>quality:{llm_quality},toxicity:{llm_toxicity},humor:{llm_humor},creativity:{llm_creativity},violence:{llm_violence},helpfulness:{llm_helpfulness},not_appropriate:{llm_inappropriate}"
    )

    for line in conversation:
        curr_prompt += line
        curr_prompt += "\n"

    return curr_prompt
