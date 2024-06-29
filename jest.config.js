module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	moduleNameMapper: {
		"^@src/(.*)$": "<rootDir>/src/$1", // Adjust the alias as per your tsconfig.json
	},
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest",
	},
	globals: {
		"ts-jest": {
			tsconfig: "tsconfig.json",
		},
	},
};
