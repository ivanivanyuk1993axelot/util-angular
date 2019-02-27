/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var log$type_log$type_pb = require('../log-type/log-type_pb.js');
var github_com_ivanivanyuk1993_util$go_authorization_proto_src_ui$permission$data_ui$permission$data_pb = require('../github.com/ivanivanyuk1993/util-go/authorization/proto/src/ui-permission-data/ui-permission-data_pb.js');
goog.exportSymbol('proto.log_type.LogTypeWithUiPermissionData', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.log_type.LogTypeWithUiPermissionData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.log_type.LogTypeWithUiPermissionData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.log_type.LogTypeWithUiPermissionData.displayName = 'proto.log_type.LogTypeWithUiPermissionData';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.log_type.LogTypeWithUiPermissionData.prototype.toObject = function(opt_includeInstance) {
  return proto.log_type.LogTypeWithUiPermissionData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.log_type.LogTypeWithUiPermissionData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.log_type.LogTypeWithUiPermissionData.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && log$type_log$type_pb.LogType.toObject(includeInstance, f),
    uiPermissionData: (f = msg.getUiPermissionData()) && github_com_ivanivanyuk1993_util$go_authorization_proto_src_ui$permission$data_ui$permission$data_pb.UiPermissionData.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.log_type.LogTypeWithUiPermissionData}
 */
proto.log_type.LogTypeWithUiPermissionData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.log_type.LogTypeWithUiPermissionData;
  return proto.log_type.LogTypeWithUiPermissionData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.log_type.LogTypeWithUiPermissionData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.log_type.LogTypeWithUiPermissionData}
 */
proto.log_type.LogTypeWithUiPermissionData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new log$type_log$type_pb.LogType;
      reader.readMessage(value,log$type_log$type_pb.LogType.deserializeBinaryFromReader);
      msg.setData(value);
      break;
    case 2:
      var value = new github_com_ivanivanyuk1993_util$go_authorization_proto_src_ui$permission$data_ui$permission$data_pb.UiPermissionData;
      reader.readMessage(value,github_com_ivanivanyuk1993_util$go_authorization_proto_src_ui$permission$data_ui$permission$data_pb.UiPermissionData.deserializeBinaryFromReader);
      msg.setUiPermissionData(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.log_type.LogTypeWithUiPermissionData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.log_type.LogTypeWithUiPermissionData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.log_type.LogTypeWithUiPermissionData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.log_type.LogTypeWithUiPermissionData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      log$type_log$type_pb.LogType.serializeBinaryToWriter
    );
  }
  f = message.getUiPermissionData();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      github_com_ivanivanyuk1993_util$go_authorization_proto_src_ui$permission$data_ui$permission$data_pb.UiPermissionData.serializeBinaryToWriter
    );
  }
};


/**
 * optional LogType data = 1;
 * @return {?proto.log_type.LogType}
 */
proto.log_type.LogTypeWithUiPermissionData.prototype.getData = function() {
  return /** @type{?proto.log_type.LogType} */ (
    jspb.Message.getWrapperField(this, log$type_log$type_pb.LogType, 1));
};


/** @param {?proto.log_type.LogType|undefined} value */
proto.log_type.LogTypeWithUiPermissionData.prototype.setData = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.log_type.LogTypeWithUiPermissionData.prototype.clearData = function() {
  this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.log_type.LogTypeWithUiPermissionData.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional ui_permission_data.UiPermissionData ui_permission_data = 2;
 * @return {?proto.ui_permission_data.UiPermissionData}
 */
proto.log_type.LogTypeWithUiPermissionData.prototype.getUiPermissionData = function() {
  return /** @type{?proto.ui_permission_data.UiPermissionData} */ (
    jspb.Message.getWrapperField(this, github_com_ivanivanyuk1993_util$go_authorization_proto_src_ui$permission$data_ui$permission$data_pb.UiPermissionData, 2));
};


/** @param {?proto.ui_permission_data.UiPermissionData|undefined} value */
proto.log_type.LogTypeWithUiPermissionData.prototype.setUiPermissionData = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.log_type.LogTypeWithUiPermissionData.prototype.clearUiPermissionData = function() {
  this.setUiPermissionData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.log_type.LogTypeWithUiPermissionData.prototype.hasUiPermissionData = function() {
  return jspb.Message.getField(this, 2) != null;
};


goog.object.extend(exports, proto.log_type);
