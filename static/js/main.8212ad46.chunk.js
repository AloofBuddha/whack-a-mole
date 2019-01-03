(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){e.exports=n.p+"static/media/mole.01c4e8db.png"},15:function(e,t,n){e.exports=n(32)},22:function(e,t,n){},24:function(e,t,n){},26:function(e,t,n){},28:function(e,t,n){},30:function(e,t,n){},32:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(10),c=n.n(o),i=n(12),l=n(6),u=n.n(l),s=n(11),m=n.n(s)()({gameState:"unstarted",moles:u.a.times(9,function(e){return{index:e,moleState:"in"}}),gameLength:3e4});var h=3e4,p=1e3,S=1,d=3,f=1500,E=2500,g=Object(i.a)(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GAMESTATE_START":return e.set("gameState","started").set("score",0).set("time",e.gameLength).set("highScore",localStorage.getItem("highScore")||0).set("moles",e.moles.map(function(e){return e.set("moleState","in")}));case"TICK":return e.update("time",function(e){return e-1e3});case"GAMESTATE_END":return e.score>e.highScore&&localStorage.setItem("highScore",e.score),e.set("gameState","gameover").set("moles",e.moles.map(function(e){return e.set("moleState","in")}));case"MOLE_COMES_OUT":return e.setIn(["moles",t.index,"moleState"],"out");case"MOLE_GOES_IN":return e.setIn(["moles",t.index,"moleState"],"in");case"MOLE_HIT":return e.setIn(["moles",t.index,"moleState"],"hit").update("score",function(e){return e+1});default:return e}});function v(){if("started"!==g.getState().gameState){new Audio("/whack-a-mole/whack.mp3").play(),g.dispatch({type:"GAMESTATE_START"});var e=setInterval(function(){g.dispatch({type:"TICK"})},1e3),t=setInterval(O,p);setTimeout(function(){clearInterval(t),clearInterval(e),g.dispatch({type:"GAMESTATE_END"})},h)}}function O(){var e=g.getState().moles,t=u.a.filter(e,function(e){return"in"===e.moleState}),n=u.a.map(t,function(e){return e.index}),a=u.a.random(S,d);u.a.sampleSize(n,a).forEach(b)}function b(e){var t=u.a.random(f,E);g.dispatch({type:"MOLE_COMES_OUT",index:e}),setTimeout(function(){g.dispatch({type:"MOLE_GOES_IN",index:e})},t)}function k(e){return function(t){"out"===g.getState().moles[e].moleState&&(new Audio("/whack-a-mole/whack.mp3").play(),g.dispatch({type:"MOLE_HIT",index:e}))}}var M=g,T=n(1),j=n(2),y=n(4),C=n(3),I=n(5),w=n(14),A=n.n(w),_=(n(22),function(e){function t(){return Object(T.a)(this,t),Object(y.a)(this,Object(C.a)(t).apply(this,arguments))}return Object(I.a)(t,e),Object(j.a)(t,[{key:"render",value:function(){var e=this.props,t=e.moleState,n=e.onMoleClick;return r.a.createElement("div",{className:N(t),onClick:n},r.a.createElement("img",{className:x(t),src:A.a,alt:"mole"}))}}]),t}(r.a.Component));function x(e){return"Mole ".concat("out"===e?"Pop-out":"")}function N(e){return"Hole ".concat("hit"===e?"Mole-hit":"")}n(24);var G=function(e){function t(){return Object(T.a)(this,t),Object(y.a)(this,Object(C.a)(t).apply(this,arguments))}return Object(I.a)(t,e),Object(j.a)(t,[{key:"render",value:function(){var e=this.props,t=e.moles,n=e.onMoleClick;return r.a.createElement("div",{className:"Gameboard"},t&&t.map(function(e){return r.a.createElement(_,{key:e.index,moleState:e.moleState,onMoleClick:n(e.index)})}))}}]),t}(r.a.Component),L=(n(26),function(e){function t(){return Object(T.a)(this,t),Object(y.a)(this,Object(C.a)(t).apply(this,arguments))}return Object(I.a)(t,e),Object(j.a)(t,[{key:"render",value:function(){var e=this.props,t=e.gameState,n=e.onStart,a=e.score,o=e.highScore,c=e.time;return r.a.createElement("div",{className:"Status",onClick:n},"unstarted"===t?r.a.createElement("div",null,r.a.createElement("h1",null,"Whack-A-Mole"),r.a.createElement("h3",null,"Whack here to start")):"started"===t?function(e,t){var n=new Date(t),a=function(e){return e<10?"0"+e:e},o=a(n.getMinutes()),c=a(n.getSeconds());return r.a.createElement("div",null,r.a.createElement("h2",null,"Score: ",e),r.a.createElement("h3",null,"Timer: ",o,":",c))}(a,c):"gameover"===t?function(e,t){return r.a.createElement("div",null,r.a.createElement("h1",null,"Game Over"),r.a.createElement("h2",null,"You scored ",e," point(s)!"),e>t?r.a.createElement("h2",null,"That's a new High Score!"):r.a.createElement("h2",null,"High Score: ",t," points"),r.a.createElement("h3",null,"Whack here to play again"))}(a,o):null)}}]),t}(r.a.Component));n(28);var H=function(e){function t(){return Object(T.a)(this,t),Object(y.a)(this,Object(C.a)(t).apply(this,arguments))}return Object(I.a)(t,e),Object(j.a)(t,[{key:"render",value:function(){var e=this.props,t=e.state,n=e.onStart,a=e.onMoleClick,o=t.moles,c=t.gameState,i=t.score,l=t.highScore,u=t.time;return r.a.createElement("div",{className:"App"},r.a.createElement(L,{onStart:n,gameState:c,score:i,highScore:l,time:u}),r.a.createElement(G,{moles:o,onMoleClick:a,gameState:c}))}}]),t}(r.a.Component);n(30);function D(){c.a.render(r.a.createElement(H,{state:M.getState(),onStart:v,onMoleClick:k}),document.getElementById("root"))}M.subscribe(D),D()}},[[15,2,1]]]);
//# sourceMappingURL=main.8212ad46.chunk.js.map