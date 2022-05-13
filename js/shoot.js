AFRAME.registerComponent('fire-balls',{
   init: function () {
      this.shootBullet();
    },
    shootBullet: function () {
      window.addEventListener("keydown", (e) => {
        if (e.key === "s") {
          var bullet = document.createElement("a-entity");
  
          bullet.setAttribute("geometry", {
            primitive: "sphere",
            radius: 0.2,
          });
  
          bullet.setAttribute("material", "color", "yellow");
  
          var cam = document.querySelector("#camera");
          pos = cam.getAttribute("position");
  
          bullet.setAttribute("position", {
            x: pos.x,
            y: pos.y + 1,
            z: pos.z - 0.5,
          });
  
          var camera = document.querySelector("#camera").object3D;
  
          //get the camera direction as Three.js Vector
          var direction = new THREE.Vector3();
          camera.getWorldDirection(direction);
  
          //set the velocity and it's direction
          bullet.setAttribute("velocity", direction.multiplyScalar(-70));
  
          var scene = document.querySelector("#scene");
  
          //set the bullet as the dynamic entity
          bullet.setAttribute("dynamic-body", {
            shape: "sphere",
            mass: "50",
          });
  
          //add the collide event listener to the bullet
          bullet.addEventListener("collide",this.removeBullet)
  
          scene.appendChild(bullet);
  
        }
      });
    },
   removeBullet: function (e) {
      var scene = document.querySelector("#scene");
      
      //bullet element
      var element = e.detail.target.el;
      var elementHit = e.detail.body.el

      //element which is hit
      var ogreEl = document.querySelectorAll('.ogre')

      var impulse = new CANNON.Vec3(-2,2,1)
      var worldPoint = new CANNON.Vec3().copy(
        elementHit.getAttribute('position')
      )
     
      elementHit.body.applyImpulse(impulse,worldPoint);

      for(var i=0;i < ogreEl.length; i++){
          scene.removeChild('ogreEl');
      }
        
        scene.removeChild(elementHit);
  
      //remove event listener
      element.removeEventListener("collide", this.removeBullet);
  
      //remove the bullets from the scene   
      scene.removeChild(element);
    }
})