import * as THREE from 'three';
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';
import {WEBGL} from './webgl'

if(WEBGL.isWebGLAvailable()) {

} else{
    var warning = WEBGL.getWebGLErrorMessage()
    document.body.appendChild(warning)
}