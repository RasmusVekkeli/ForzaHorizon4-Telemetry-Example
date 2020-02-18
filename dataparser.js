// Parses telemetry data from a buffer (msg) and sets properties of telemetryData
module.exports.dataParser = function dataParser(msg, telemetryData) {
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
} 