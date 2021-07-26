/**
 * @fileoverview gRPC-Web generated client stub for numbers
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!

/* eslint-disable */
// @ts-nocheck

const grpc = {};
grpc.web = require("grpc-web");

const proto = {};
proto.numbers = require("./Number_pb.js");

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.numbers.NumbersClient = function (hostname, credentials, options) {
  if (!options) options = {};
  options["format"] = "text";

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;
};

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.numbers.NumbersPromiseClient = function (hostname, credentials, options) {
  if (!options) options = {};
  options["format"] = "text";

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.numbers.NumberRequest,
 *   !proto.numbers.NumberResponse>}
 */
const methodDescriptor_Numbers_GetNumbers = new grpc.web.MethodDescriptor(
  "/numbers.Numbers/GetNumbers",
  grpc.web.MethodType.SERVER_STREAMING,
  proto.numbers.NumberRequest,
  proto.numbers.NumberResponse,
  /**
   * @param {!proto.numbers.NumberRequest} request
   * @return {!Uint8Array}
   */
  function (request) {
    return request.serializeBinary();
  },
  proto.numbers.NumberResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.numbers.NumberRequest,
 *   !proto.numbers.NumberResponse>}
 */
const methodInfo_Numbers_GetNumbers =
  new grpc.web.AbstractClientBase.MethodInfo(
    proto.numbers.NumberResponse,
    /**
     * @param {!proto.numbers.NumberRequest} request
     * @return {!Uint8Array}
     */
    function (request) {
      return request.serializeBinary();
    },
    proto.numbers.NumberResponse.deserializeBinary
  );

/**
 * @param {!proto.numbers.NumberRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.numbers.NumberResponse>}
 *     The XHR Node Readable Stream
 */
proto.numbers.NumbersClient.prototype.getNumbers = function (
  request,
  metadata
) {
  return this.client_.serverStreaming(
    this.hostname_ + "/numbers.Numbers/GetNumbers",
    request,
    metadata || {},
    methodDescriptor_Numbers_GetNumbers
  );
};

/**
 * @param {!proto.numbers.NumberRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.numbers.NumberResponse>}
 *     The XHR Node Readable Stream
 */
proto.numbers.NumbersPromiseClient.prototype.getNumbers = function (
  request,
  metadata
) {
  return this.client_.serverStreaming(
    this.hostname_ + "/numbers.Numbers/GetNumbers",
    request,
    metadata || {},
    methodDescriptor_Numbers_GetNumbers
  );
};

module.exports = proto.numbers;
