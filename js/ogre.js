AFRAME.registerComponent('ogre-ball',{
init: function(){
   setInterval(this.ogreBullet,2000)
},
ogreBullet: function(){
  var mons = document.querySelectorAll('.ogre');

  for(var i=0;i<mons.length;i++){
       
       var ogre_Bullet = document.createElement('a-entity')

       ogre_Bullet.setAttribute('geometry',{
           primitive : 'sphere',
           radius : 0.2
       })

       ogre_Bullet.setAttribute('material','color','orange');

       var position = mons[i].getAttribute('position')

       ogre_Bullet.setAttribute('position',{
           x : position.x + 1.5,
           y : position.y + 3.5,
           z : position.z
       })

       var ogre = mons[i].object3D
       var player = document.querySelector('#player')

       var position1 = new THREE.Vector3();
       var position2 = new THREE.Vector3();

       player.getWorldPosition(position1);
       ogre.getWorldPosition(position2);

       var direction = new THREE.Vector3();

       direction.subVectors(position1,position2).normalize();

       ogre_Bullet.setAttribute('velocity',direction.multiplyScaler(-60));

       ogre_Bullet.setAttribute('dynamic-body',{
           shape:  'sphere',
           mass : '0'
       })
       var element = document.querySelector('#Life_text');

       var playerLife = parseInt(element.getAttribute('text').value);

       var scene = document.querySelector('#scene')
       scene.appendChild(ogre_Bullet)

       ogre.addEventListener('collide',function (e) {
          if(e.detail.body.el.id === 'player'){
               
             if(playerLife > 0){
                playerLife +=1
                element.setAttribute('text',{
                    value : playerLife
                })
             }

             if(playerLife <= 0 ){
                var text = document.querySelector('#over');

                text.setAttribute('visible',true);

                var ogreEl = document.querySelectorAll('.ogre')
                for(var i=0;i < ogreEl.length;i++){
                    scene.removeChild(ogreEl)   
                }
             }
          }
       })
   }

}
})