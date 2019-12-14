const algorithm = require('../models/algorithmMODEL').Algorithm;
module.exports.AlgorithmInfo = class AlgorithmInfo {
    constructor(numOfClusters, maxIterations, randomState, algorithmId, init, initialIterations, model) {
        this.numOfClusters = numOfClusters,
            this.maxIterations = maxIterations,
            this.randomState = randomState,
            this.init = init,
            this.initialIterations = initialIterations,
            this.algorithmId = algorithmId,
            this.model = model;

        if (this.maxIterations === undefined)
            this.maxIterations = null;
        if (this.randomState === undefined)
            this.randomState = null;
        if (this.init === undefined)
            this.init = null;
        if (this.initialIterations === undefined)
            this.initialIterations = null;
    }
    async validate(algorithmId) {
        return new Promise(async (resolve, reject) => {
            if (algorithmId === undefined || algorithmId === null) reject('Invalid input')
            try {
                await algorithm.getById(algorithmId);
                resolve();
            } catch (error) {
                reject('Invalid input')
            }
        });
    }
}