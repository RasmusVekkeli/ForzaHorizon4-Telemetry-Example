const dgram = require("dgram");

const server = dgram.createSocket("udp4");

const telemetryData = {
	// Offset 0
	isRaceOn: false, 		// int32, actually a boolean
	timestampMs: 0,			// Uint32
	
	// All floats unless said otherwise
	// Offset 8
	engineMaxRpm: 0,
	engineIdleRpm: 0,
	// Offset 16
	currentEngineRpm: 0,

	accelerationX: 0,
	// Offset 24
	accelerationY: 0,
	accelerationZ: 0,

	// Offset 32
	velocityX: 0,
	velocityY: 0,
	// Offset 40
	velocityZ: 0,

	angularVelocityX: 0,
	// Offset 48
	angularVelocityY: 0,
	angularVelocityZ: 0,

	// Offset 56
	yaw: 0,
	pitch: 0,
	// Offset 64
	roll: 0,

	normalizedSuspensionTravelFrontLeft: 0,
	// Offset 72
	normalizedSuspensionTravelFrontRight: 0,
	normalizedSuspensionTravelRearLeft: 0,
	// Offset 80
	normalizedSuspensionTravelRearRight: 0,

	tireSlipRatioFrontLeft: 0,
	// Offset 88
	tireSlipRatioFrontRight: 0,
	tireSlipRatioRearLeft: 0,
	// Offset 96
	tireSlipRatioRearRight: 0,

	wheelRotationSpeedFrontLeft: 0,
	// Offset 104
	wheelRotationSpeedFrontRight: 0,
	wheelRotationSpeedRearLeft: 0,
	// Offset 112
	wheelRotationSpeedRearRight: 0,

	// these four are int32, actually boolean
	// Probably always false for Horizon
	wheelOnRumbleStripFrontLeft: false,
	// Offset 120
	wheelOnRumbleStripFrontRight: false,
	wheelOnRumbleStripRearLeft: false,
	// Offset 128
	wheelOnRumbleStripRearRight: false,

	wheelInPuddleDepthFrontLeft: 0,
	// Offset 136
	wheelInPuddleDepthFrontRight: 0,
	wheelInPuddleDepthRearLeft: 0,
	// Offset 144
	wheelInPuddleDepthRearRight: 0,

	surfaceRumbleFrontLeft: 0,
	// Offset 152
	surfaceRumbleFrontRight: 0,
	surfaceRumbleRearLeft: 0,
	// Offset 160
	surfaceRumbleRearRight: 0,

	tireSlipAngleFrontLeft: 0,
	// Offset 168
	tireSlipAngleFrontRight: 0,
	tireSlipAngleRearLeft: 0,
	// Offset 176
	tireSlipAngleRearRight: 0,

	tireCombinedSlipFrontLeft: 0,
	// Offset 184
	tireCombinedSlipFrontRight: 0,
	tireCombinedSlipRearLeft: 0,
	// Offset 192
	tireCombinedSlipRearRight: 0,

	suspensionMaxTravelMetersFrontLeft: 0,
	// Offset 200
	suspensionMaxTravelMetersFrontRight: 0,
	suspensionMaxTravelMetersRearLeft: 0,
	// Offset 208
	suspensionMaxTravelMetersRearRight: 0,

	// these five are int32
	carOrdinal: 0,
	// Offset 216
	carClass: 0,
	carPerformanceIndex: 0,
	// Offset 224
	drivetrainType: 0,
	numCylinders: 0,
	// Not listed in the forum post
	// TODO: Figure out the enum values for this
	// Offset 232
	carCategory: 0,

	// No idea what these are supposed to be
	mysteryValue0: 0,	// Offset 236
	mysteryValue1: 0,	// Offset 240

	// Offset 244
	positionX: 0,
	positionY: 0,
	// Offset 252
	positionZ: 0,

	speed: 0,
	// Offset 260
	power: 0,
	torque: 0,

	// In fahrenheit
	// Offset 268
	tireTempFrontLeft: 0,
	tireTempFrontRight: 0,
	// Offset 276
	tireTempRearLeft: 0,
	tireTempRearRight: 0,

	// Offset 284
	boost: 0,
	fuel: 0,
	// Offset 292
	distanceTravelled: 0,
	bestLap: 0,
	// Offset 300
	lastLap: 0,
	currentLap: 0,
	// Offset 308
	currentRaceTime: 0,

	// Starts from 0 for some reason
	// Offset 312
	lapNumber: 0,		// Uint16
	// Offset 314
	racePosition: 0,	// Uint8

	// These are Uint8
	// Offset 315
	accel: 0,
	// Offset 316
	brake: 0,
	// Offset 317
	clutch: 0,
	// Offset 318
	handbrake: 0,
	// Offset 319
	gear: 0,
	// Offset 320
	steer: 0, 	// Except this one is int8

	// int8, maybe boolean
	// Offset 321
	normalizedDrivingLine: 0,
	// Offset 322
	normalizedAiBrakeDifference: 0,

	// Last byte of the packet
	// Offset 323
	mysteryValue2: 0
}

server.on("error", (e) => {
	console.log("Error happened!");
	console.log(e.stack);

	server.close();
})

server.on("message", (msg, rinfo) => {
	// Read data from buffer, with byte offsets...
	telemetryData.isRaceOn = Boolean(msg.readInt32LE(0));
	telemetryData.timestampMs = msg.readUInt32LE(4);

	telemetryData.engineMaxRpm = msg.readFloatLE(8);
	telemetryData.engineIdleRpm = msg.readFloatLE(12);
	telemetryData.currentEngineRpm = msg.readFloatLE(16);

	telemetryData.accelerationX = msg.readFloatLE(20);
	telemetryData.accelerationY = msg.readFloatLE(24);
	telemetryData.accelerationZ = msg.readFloatLE(28);

	telemetryData.velocityX = msg.readFloatLE(32);
	telemetryData.velocityY = msg.readFloatLE(36);
	telemetryData.velocityZ = msg.readFloatLE(40);

	telemetryData.angularVelocityX = msg.readFloatLE(44);
	telemetryData.angularVelocityY = msg.readFloatLE(48);
	telemetryData.angularVelocityZ = msg.readFloatLE(52);

	telemetryData.yaw = msg.readFloatLE(56);
	telemetryData.pitch = msg.readFloatLE(60);
	telemetryData.roll = msg.readFloatLE(64);

	telemetryData.normalizedSuspensionTravelFrontLeft = msg.readFloatLE(68);
	telemetryData.normalizedSuspensionTravelFrontRight = msg.readFloatLE(72);
	telemetryData.normalizedSuspensionTravelRearLeft = msg.readFloatLE(76);
	telemetryData.normalizedSuspensionTravelRearRight = msg.readFloatLE(80);

	telemetryData.tireSlipRatioFrontLeft = msg.readFloatLE(84);
	telemetryData.tireSlipRatioFrontRight = msg.readFloatLE(88);
	telemetryData.tireSlipRatioRearLeft = msg.readFloatLE(92);
	telemetryData.tireSlipRatioRearRight = msg.readFloatLE(96);

	telemetryData.wheelRotationSpeedFrontLeft = msg.readFloatLE(100);
	telemetryData.wheelRotationSpeedFrontRight = msg.readFloatLE(104);
	telemetryData.wheelRotationSpeedRearLeft = msg.readFloatLE(108);
	telemetryData.wheelRotationSpeedRearRight = msg.readFloatLE(112);

	telemetryData.wheelOnRumbleStripFrontLeft = Boolean(msg.readInt32LE(116));
	telemetryData.wheelOnRumbleStripFrontRight = Boolean(msg.readInt32LE(120));
	telemetryData.wheelOnRumbleStripRearLeft = Boolean(msg.readInt32LE(124));
	telemetryData.wheelOnRumbleStripRearRight = Boolean(msg.readInt32LE(128));

	telemetryData.wheelInPuddleDepthFrontLeft = msg.readFloatLE(132);
	telemetryData.wheelInPuddleDepthFrontRight = msg.readFloatLE(136);
	telemetryData.wheelInPuddleDepthRearLeft = msg.readFloatLE(140);
	telemetryData.wheelInPuddleDepthRearRight = msg.readFloatLE(144);

	telemetryData.surfaceRumbleFrontLeft = msg.readFloatLE(148);
	telemetryData.surfaceRumbleFrontRight = msg.readFloatLE(152);
	telemetryData.surfaceRumbleRearLeft = msg.readFloatLE(156);
	telemetryData.surfaceRumbleRearRight = msg.readFloatLE(160);

	telemetryData.tireSlipAngleFrontLeft = msg.readFloatLE(164);
	telemetryData.tireSlipAngleFrontRight = msg.readFloatLE(168);
	telemetryData.tireSlipAngleRearLeft = msg.readFloatLE(172);
	telemetryData.tireSlipAngleRearRight = msg.readFloatLE(176);
	
	telemetryData.tireCombinedSlipFrontLeft = msg.readFloatLE(180);
	telemetryData.tireCombinedSlipFrontRight = msg.readFloatLE(184);
	telemetryData.tireCombinedSlipRearLeft = msg.readFloatLE(188);
	telemetryData.tireCombinedSlipRearRight = msg.readFloatLE(192);

	telemetryData.suspensionMaxTravelMetersFrontLeft = msg.readFloatLE(196);
	telemetryData.suspensionMaxTravelMetersFrontRight = msg.readFloatLE(200);
	telemetryData.suspensionMaxTravelMetersRearLeft = msg.readFloatLE(204);
	telemetryData.suspensionMaxTravelMetersRearRight = msg.readFloatLE(208);

	telemetryData.carOrdinal = msg.readInt32LE(212);
	telemetryData.carClass = msg.readInt32LE(216);
	telemetryData.carPerformanceIndex = msg.readInt32LE(220);
	telemetryData.drivetrainType = msg.readInt32LE(224);
	telemetryData.numCylinders = msg.readInt32LE(228);
	telemetryData.carCategory = msg.readInt32LE(232);

	telemetryData.mysteryValue0 = msg.readInt32LE(236);
	telemetryData.mysteryValue1 = msg.readInt32LE(240);

	telemetryData.positionX = msg.readFloatLE(244);
	telemetryData.positionY = msg.readFloatLE(248);
	telemetryData.positionZ = msg.readFloatLE(252);

	telemetryData.speed = msg.readFloatLE(256);
	telemetryData.power = msg.readFloatLE(260);
	telemetryData.torque = msg.readFloatLE(264);

	telemetryData.tireTempFrontLeft = msg.readFloatLE(268);
	telemetryData.tireTempFrontRight = msg.readFloatLE(272);
	telemetryData.tireTempRearLeft = msg.readFloatLE(276);
	telemetryData.tireTempRearRight = msg.readFloatLE(280);

	telemetryData.boost = msg.readFloatLE(284);
	telemetryData.fuel = msg.readFloatLE(288);
	telemetryData.distanceTravelled = msg.readFloatLE(292);
	telemetryData.bestLap = msg.readFloatLE(296);
	telemetryData.lastLap = msg.readFloatLE(300);
	telemetryData.currentLap = msg.readFloatLE(304);
	telemetryData.currentRaceTime = msg.readFloatLE(308);

	telemetryData.lapNumber = msg.readUInt16LE(312);
	telemetryData.racePosition = msg.readUInt8(314);

	telemetryData.accel = msg.readUInt8(315);
	telemetryData.brake = msg.readUInt8(316);
	telemetryData.clutch = msg.readUInt8(317);
	telemetryData.handbrake = msg.readUInt8(318);
	telemetryData.gear = msg.readUInt8(319);
	telemetryData.steer = msg.readInt8(320);

	telemetryData.normalizedDrivingLine = msg.readInt8(321);
	telemetryData.normalizedAiBrakeDifference = msg.readInt8(322);

	telemetryData.mysteryValue2 = msg.readUInt8(323);
});

server.on("listening", () => {
	const s = server.address();

	console.log(`Listening on ${s.address}:${s.port}`);
});

server.bind(60022);

