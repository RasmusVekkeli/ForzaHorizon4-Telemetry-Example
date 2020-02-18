const dgram = require("dgram");

const dataParser = require("./dataparser").dataParser;

const server = dgram.createSocket("udp4");

// Change this to change the binded port
const port = 60022;

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
	dataParser(msg, telemetryData);

	if (telemetryData.isRaceOn) {
		console.log(telemetryData.speed);
	}
});

server.on("listening", () => {
	const s = server.address();

	console.log(`Listening on ${s.address}:${s.port}`);
});

server.bind(port);

