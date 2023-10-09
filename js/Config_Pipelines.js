// Config_Pipelines.js



// computePipelineConfig.js
export function createComputePipeline(device, computeShaderCode, computeBindGroupLayout) {
    return device.createComputePipeline({
        layout: device.createPipelineLayout({ bindGroupLayouts: [computeBindGroupLayout] }),
        compute: {
            module: device.createShaderModule({ code: computeShaderCode }),
            entryPoint: 'main'
        }
    });
}


export function createRenderPipeline(device, vertexShaderCode, fragmentShaderCode, swapChainFormat, renderBindGroupLayout) {
    return device.createRenderPipeline({
        layout: device.createPipelineLayout({ bindGroupLayouts: [renderBindGroupLayout] }),

        vertex: {
            module: device.createShaderModule({ code: vertexShaderCode }),
            entryPoint: 'vs_main',
            buffers: [{
                arrayStride: 8,
                attributes: [{
                    shaderLocation: 0,
                    offset: 0,
                    format: 'float32x2'
                }]
            }]
        },

        fragment: {
            module: device.createShaderModule({ code: fragmentShaderCode }),
            entryPoint: 'fs_main',
            targets: [{
                format: swapChainFormat
            }]
        },

        primitive: {
            topology: 'triangle-strip',
            cullMode: 'none',
        },
    });
}