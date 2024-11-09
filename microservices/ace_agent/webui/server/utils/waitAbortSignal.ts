/*
 * SPDX-FileCopyrightText: Copyright (c) 2024 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns a promise that rejects as soon as the provided abortController is fired. This
 * is useful to stop the task from running after the tests are completed
 */
export default function waitAbortSignal(
  abortController: AbortController
): Promise<void> {
  return new Promise((_, reject) => {
    abortController.signal.addEventListener("abort", () => {
      const error: any = new Error("aborted");
      error.code = 1;
      reject(error);
    });
  });
}