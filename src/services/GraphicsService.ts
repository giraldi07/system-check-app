import { GraphicsInfo } from '../types/diagnostics';

export class GraphicsService {
  getGraphicsInfo(): GraphicsInfo {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') as WebGLRenderingContext || 
               canvas.getContext('experimental-webgl') as WebGLRenderingContext;
    
    if (!gl) {
      return {
        renderer: 'Not Available',
        vendor: 'Not Available',
        webglVersion: 'Not Supported',
        maxTextureSize: 0,
        supported: false,
        extensions: []
      };
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');

    return {
      renderer: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Unknown',
      vendor: debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'Unknown',
      webglVersion: gl.getParameter(gl.VERSION),
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
      supported: true,
      extensions: gl.getSupportedExtensions() || []
    };
  }
}
