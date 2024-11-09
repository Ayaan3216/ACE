//
// Copyright (c) 2024, NVIDIA CORPORATION.  All rights reserved.
//
// NVIDIA CORPORATION and its licensors retain all intellectual property
// and proprietary rights in and to this software, related documentation
// and any modifications thereto.  Any use, reproduction, disclosure or
// distribution of this software and related documentation without an express
// license agreement from NVIDIA CORPORATION is strictly prohibited.

// @generated by protoc-gen-connect-es v1.4.0
// @generated from file ace_agent.proto (package nvidia.aceagent.chatcontroller.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { APIStatusResponse, ChatRequest, ChatResponse, EventRequest, EventResponse, GetStatusRequest, GetStatusResponse, PipelineRequest, ReceiveAudioRequest, ReceiveAudioResponse, ReloadSpeechConfigsRequest, SendAudioRequest, SpeechRecognitionControlRequest, StreamingSpeechResultsRequest, StreamingSpeechResultsResponse, SynthesizeSpeechRequest, UserContext, UserContextRequest, UserParametersRequest } from "./ace_agent_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 *
 * The AceAgentGrpc service provides apis to interact with chat engine and speech
 * components.
 *
 * @generated from service nvidia.aceagent.chatcontroller.v1.AceAgentGrpc
 */
export declare const AceAgentGrpc: {
  readonly typeName: "nvidia.aceagent.chatcontroller.v1.AceAgentGrpc",
  readonly methods: {
    /**
     * CreatePipeline API is used to create new pipeline with Chat controller,
     *  It acquires a Chat controller pipeline with a unique stream_id populated
     * by the client in PipelineRequest.
     *
     * @generated from rpc nvidia.aceagent.chatcontroller.v1.AceAgentGrpc.CreatePipeline
     */
    readonly createPipeline: {
      readonly name: "CreatePipeline",
      readonly I: typeof PipelineRequest,
      readonly O: typeof APIStatusResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * FreePipeline API is used to free up a pipeline with Chat controller,
     * created by using CreatePipeline API. Client needs to pass same stream_id
     * in PipelineRequest as used in CreatePipeline.
     *
     * @generated from rpc nvidia.aceagent.chatcontroller.v1.AceAgentGrpc.FreePipeline
     */
    readonly freePipeline: {
      readonly name: "FreePipeline",
      readonly I: typeof PipelineRequest,
      readonly O: typeof APIStatusResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * SendAudio API is used to stream audio content to ASR from Chat controller.
     * This is a client side streaming API.
     *
     * @generated from rpc nvidia.aceagent.chatcontroller.v1.AceAgentGrpc.SendAudio
     */
    readonly sendAudio: {
      readonly name: "SendAudio",
      readonly I: typeof SendAudioRequest,
      readonly O: typeof APIStatusResponse,
      readonly kind: MethodKind.ClientStreaming,
    },
    /**
     * ReceiveAudio API is used to receive synthesized audio from TTS through
     * Chat controller. This is a server side streaming API.
     *
     * @generated from rpc nvidia.aceagent.chatcontroller.v1.AceAgentGrpc.ReceiveAudio
     */
    readonly receiveAudio: {
      readonly name: "ReceiveAudio",
      readonly I: typeof ReceiveAudioRequest,
      readonly O: typeof ReceiveAudioResponse,
      readonly kind: MethodKind.ServerStreaming,
    },
    /**
     * StreamSpeechResults API is used to receive all the meta data from
     * Chat controller like  ASR transcripts, Chat engine responses, Pipeline
     * states etc. This is a broadcasting API i.e it can fan out responses to
     * multiple concurrent client instances using same stream_id.
     * This is a server side streaming API.
     *
     * @generated from rpc nvidia.aceagent.chatcontroller.v1.AceAgentGrpc.StreamSpeechResults
     */
    readonly streamSpeechResults: {
      readonly name: "StreamSpeechResults",
      readonly I: typeof StreamingSpeechResultsRequest,
      readonly O: typeof StreamingSpeechResultsResponse,
      readonly kind: MethodKind.ServerStreaming,
    },
    /**
     * StartRecognition API is used to start the ASR recognition in Chat
     * controller for the audio content streamed from SendAudio API.
     * This API also provides a flag to mark the ASR recognition as standalone,
     * i.e Chat Engine and TTS will not be invoked for the ASR transcript.
     *
     * @generated from rpc nvidia.aceagent.chatcontroller.v1.AceAgentGrpc.StartRecognition
     */
    readonly startRecognition: {
      readonly name: "StartRecognition",
      readonly I: typeof SpeechRecognitionControlRequest,
      readonly O: typeof APIStatusResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * StopRecognition API is used to stop the ASR recognition for the audio
     * content streamed from SendAudio API.
     *
     * @generated from rpc nvidia.aceagent.chatcontroller.v1.AceAgentGrpc.StopRecognition
     */
    readonly stopRecognition: {
      readonly name: "StopRecognition",
      readonly I: typeof SpeechRecognitionControlRequest,
      readonly O: typeof APIStatusResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * This API can be used to set the runtime user parameters like user_id
     * for Chat controller pipeline.
     *
     * @generated from rpc nvidia.aceagent.chatcontroller.v1.AceAgentGrpc.SetUserParameters
     */
    readonly setUserParameters: {
      readonly name: "SetUserParameters",
      readonly I: typeof UserParametersRequest,
      readonly O: typeof APIStatusResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * GetStatus API can be used to get the latest state of Chat controller pipeline.
     *
     * @generated from rpc nvidia.aceagent.chatcontroller.v1.AceAgentGrpc.GetStatus
     */
    readonly getStatus: {
      readonly name: "GetStatus",
      readonly I: typeof GetStatusRequest,
      readonly O: typeof GetStatusResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * ReloadSpeechConfigs API can be used to reload the ASR word boosting and
     * TTS Arpbet configs in Chat controller.
     *
     * @generated from rpc nvidia.aceagent.chatcontroller.v1.AceAgentGrpc.ReloadSpeechConfigs
     */
    readonly reloadSpeechConfigs: {
      readonly name: "ReloadSpeechConfigs",
      readonly I: typeof ReloadSpeechConfigsRequest,
      readonly O: typeof APIStatusResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * SynthesizeSpeech API is used to send text transcript directly to the TTS
     * for standalone TTS audio synthesis.
     * The generated audio will be routed to the path specified in the pipeline
     * graph provided in Chat controller.
     * e.g. if the TTS audio is routed to A2F in the graph, the audio will be
     * sent to A2F server.
     * If the TTS audio is routed to Grpc client then it will be available
     * through the server side streaming ReceiveAudio API.
     *
     * @generated from rpc nvidia.aceagent.chatcontroller.v1.AceAgentGrpc.SynthesizeSpeech
     */
    readonly synthesizeSpeech: {
      readonly name: "SynthesizeSpeech",
      readonly I: typeof SynthesizeSpeechRequest,
      readonly O: typeof APIStatusResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * GetUserContext API is used to get the current user context from Chat Engine.
     * The API returns a UserContext message containing the current conversation
     * history and any context attached to the active user_id.
     *
     * @generated from rpc nvidia.aceagent.chatcontroller.v1.AceAgentGrpc.GetUserContext
     */
    readonly getUserContext: {
      readonly name: "GetUserContext",
      readonly I: typeof UserContextRequest,
      readonly O: typeof UserContext,
      readonly kind: MethodKind.Unary,
    },
    /**
     * SetUserContext API is used to set the current user context in Chat Engine.
     * The API accepts a UserContext message containing the conversation
     * history and any context to be attached to the active user_id.
     *
     * @generated from rpc nvidia.aceagent.chatcontroller.v1.AceAgentGrpc.SetUserContext
     */
    readonly setUserContext: {
      readonly name: "SetUserContext",
      readonly I: typeof UserContext,
      readonly O: typeof APIStatusResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * UpdateUserContext API is used to update the current user context from
     * Chat Engine. The API accepts a UserContext message containing any context
     * to be attached to the active user_id.
     *
     * @generated from rpc nvidia.aceagent.chatcontroller.v1.AceAgentGrpc.UpdateUserContext
     */
    readonly updateUserContext: {
      readonly name: "UpdateUserContext",
      readonly I: typeof UserContext,
      readonly O: typeof APIStatusResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * DeleteUserContext API is used to delete the current user context attached
     * to a user_id in Chat Engine.
     *
     * @generated from rpc nvidia.aceagent.chatcontroller.v1.AceAgentGrpc.DeleteUserContext
     */
    readonly deleteUserContext: {
      readonly name: "DeleteUserContext",
      readonly I: typeof UserContextRequest,
      readonly O: typeof APIStatusResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * Chat API is used to send text queries to Chat Engine via Chat controller.
     * This API also provides a flag to disable TTS synthesis for the response
     * generated by Chat Engine.
     * This can be used for a text in and text out type of scenario.
     *
     * @generated from rpc nvidia.aceagent.chatcontroller.v1.AceAgentGrpc.Chat
     */
    readonly chat: {
      readonly name: "Chat",
      readonly I: typeof ChatRequest,
      readonly O: typeof ChatResponse,
      readonly kind: MethodKind.ServerStreaming,
    },
    /**
     * Event API is used to send events to Chat Engine via Chat controller.
     *
     * @generated from rpc nvidia.aceagent.chatcontroller.v1.AceAgentGrpc.Event
     */
    readonly event: {
      readonly name: "Event",
      readonly I: typeof EventRequest,
      readonly O: typeof EventResponse,
      readonly kind: MethodKind.ServerStreaming,
    },
  }
};
