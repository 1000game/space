

initializeScene_() 
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        './space-posx.jpg', // Positive X
        './space-negx.jpg', // Negative X
        './space-posy.jpg', // Positive Y
        './space-negy.jpg', // Negative Y
        './space-posz.jpg', // Positive Z
        './space-negz.jpg'  // Negative Z
     
  ]);

    texture.encoding = THREE.sRGBEncoding;
    this.scene_.background = texture;
