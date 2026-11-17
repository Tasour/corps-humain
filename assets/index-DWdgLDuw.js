(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Fo="187",Zi={ROTATE:0,DOLLY:1,PAN:2},Yi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},dd=0,Ll=1,hd=2,Er=1,fd=2,bs=3,Mi=0,Wt=1,Zt=2,Si=0,Es=1,Gt=2,Pl=3,Dl=4,pd=5,Xi=100,md=101,gd=102,vd=103,_d=104,xd=200,yd=201,bd=202,Sd=203,Qc=204,jc=205,Md=206,Ed=207,Td=208,Ad=209,wd=210,Rd=211,Cd=212,Ld=213,Pd=214,qa=0,Wa=1,Xa=2,Ls=3,$a=4,Ya=5,Ka=6,Za=7,eu=0,Dd=1,Id=2,Vn=0,Oo=1,Bo=2,zo=3,Wr=4,ko=5,Ho=6,Go=7,tu=300,ji=301,Ps=302,oa=303,la=304,Ja=1e3,zn=1001,Qa=1002,Lt=1003,Nd=1004,Ws=1005,Jt=1006,ca=1007,ti=1008,sn=1009,nu=1010,iu=1011,Ds=1012,Vo=1013,Pn=1014,Cn=1015,jt=1016,qo=1017,Wo=1018,es=1020,su=35902,ru=35899,au=1021,ou=1022,Ln=1023,ii=1026,ni=1027,lu=1028,Xo=1029,Ei=1030,$o=1031,Yo=1033,Tr=33776,Ar=33777,wr=33778,Rr=33779,ja=35840,eo=35841,to=35842,no=35843,io=36196,so=37492,ro=37496,ao=37488,oo=37489,Nr=37490,lo=37491,co=37808,uo=37809,ho=37810,fo=37811,po=37812,mo=37813,go=37814,vo=37815,_o=37816,xo=37817,yo=37818,bo=37819,So=37820,Mo=37821,Eo=36492,To=36494,Ao=36495,wo=36283,Ro=36284,Ur=36285,Co=36286,Ud=3200,Lo=0,Fd=1,ei="",Kt="srgb",Fr="srgb-linear",Or="linear",nt="srgb",ua=7680,Od=519,Bd=512,zd=513,kd=514,cu=515,Hd=516,Gd=517,uu=518,du=519,hu=35044,Il="300 es",bn=2e3,Is=2001;function Vd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Br(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function qd(){const i=Br("canvas");return i.style.display="block",i}const Nl={};function zr(...i){const e="THREE."+i.shift();console.log(e,...i)}function fu(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function De(...i){i=fu(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Qe(...i){i=fu(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Cr(...i){const e=i.join(" ");e in Nl||(Nl[e]=!0,De(...i))}function Wd(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Xd={[qa]:qa,[Xa]:Ka,[$a]:$a,[Ls]:Ya,[Wa]:Wa,[Ka]:Xa,[Za]:Za,[Ya]:Ls};class ai{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Ut=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ul=1234567;const Ts=Math.PI/180,Ns=180/Math.PI;function oi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ut[i&255]+Ut[i>>8&255]+Ut[i>>16&255]+Ut[i>>24&255]+"-"+Ut[e&255]+Ut[e>>8&255]+"-"+Ut[e>>16&15|64]+Ut[e>>24&255]+"-"+Ut[t&63|128]+Ut[t>>8&255]+"-"+Ut[t>>16&255]+Ut[t>>24&255]+Ut[n&255]+Ut[n>>8&255]+Ut[n>>16&255]+Ut[n>>24&255]).toLowerCase()}function qe(i,e,t){return Math.max(e,Math.min(t,i))}function Ko(i,e){return(i%e+e)%e}function $d(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Yd(i,e,t){return i!==e?(t-i)/(e-i):0}function As(i,e,t){return(1-t)*i+t*e}function Kd(i,e,t,n){return As(i,e,1-Math.exp(-t*n))}function Zd(i,e=1){return e-Math.abs(Ko(i,e*2)-e)}function Jd(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Qd(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function jd(i,e){return i+Math.floor(Math.random()*(e-i+1))}function eh(i,e){return i+Math.random()*(e-i)}function th(i){return i*(.5-Math.random())}function nh(i){i!==void 0&&(Ul=i);let e=Ul+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ih(i){return i*Ts}function sh(i){return i*Ns}function rh(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function ah(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function pu(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function oh(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),d=a((e+n)/2),f=r((e-n)/2),u=a((e-n)/2),h=r((n-e)/2),m=a((n-e)/2);switch(s){case"XYX":i.set(o*d,c*f,c*u,o*l);break;case"YZY":i.set(c*u,o*d,c*f,o*l);break;case"ZXZ":i.set(c*f,c*u,o*d,o*l);break;case"XZX":i.set(o*d,c*m,c*h,o*l);break;case"YXY":i.set(c*h,o*d,c*m,o*l);break;case"ZYZ":i.set(c*m,c*h,o*d,o*l);break;default:De("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Xr(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Zo(i,e){if(e.constructor===Float32Array)return i;const t=Xr(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/t,-1)}function Jo(i,e){if(e.constructor===Float32Array)return i;const t=Xr(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*t)}const Qo={DEG2RAD:Ts,RAD2DEG:Ns,generateUUID:oi,clamp:qe,euclideanModulo:Ko,mapLinear:$d,inverseLerp:Yd,lerp:As,damp:Kd,pingpong:Zd,smoothstep:Jd,smootherstep:Qd,randInt:jd,randFloat:eh,randFloatSpread:th,seededRandom:nh,degToRad:ih,radToDeg:sh,isPowerOfTwo:rh,ceilPowerOfTwo:ah,floorPowerOfTwo:pu,setQuaternionFromProperEuler:oh,normalize:Jo,denormalize:Zo},ml=class ml{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ml.prototype.isVector2=!0;let re=ml;class si{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],d=n[s+2],f=n[s+3],u=r[a+0],h=r[a+1],m=r[a+2],_=r[a+3];if(f!==_||c!==u||l!==h||d!==m){let g=c*u+l*h+d*m+f*_;g<0&&(u=-u,h=-h,m=-m,_=-_,g=-g);let p=1-o;if(g<.9995){const y=Math.acos(g),E=Math.sin(y);p=Math.sin(p*y)/E,o=Math.sin(o*y)/E,c=c*p+u*o,l=l*p+h*o,d=d*p+m*o,f=f*p+_*o}else{c=c*p+u*o,l=l*p+h*o,d=d*p+m*o,f=f*p+_*o;const y=1/Math.sqrt(c*c+l*l+d*d+f*f);c*=y,l*=y,d*=y,f*=y}}e[t]=c,e[t+1]=l,e[t+2]=d,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],d=n[s+3],f=r[a],u=r[a+1],h=r[a+2],m=r[a+3];return e[t]=o*m+d*f+c*h-l*u,e[t+1]=c*m+d*u+l*f-o*h,e[t+2]=l*m+d*h+o*u-c*f,e[t+3]=d*m-o*f-c*u-l*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),d=o(s/2),f=o(r/2),u=c(n/2),h=c(s/2),m=c(r/2);switch(a){case"XYZ":this._x=u*d*f+l*h*m,this._y=l*h*f-u*d*m,this._z=l*d*m+u*h*f,this._w=l*d*f-u*h*m;break;case"YXZ":this._x=u*d*f+l*h*m,this._y=l*h*f-u*d*m,this._z=l*d*m-u*h*f,this._w=l*d*f+u*h*m;break;case"ZXY":this._x=u*d*f-l*h*m,this._y=l*h*f+u*d*m,this._z=l*d*m+u*h*f,this._w=l*d*f-u*h*m;break;case"ZYX":this._x=u*d*f-l*h*m,this._y=l*h*f+u*d*m,this._z=l*d*m-u*h*f,this._w=l*d*f+u*h*m;break;case"YZX":this._x=u*d*f+l*h*m,this._y=l*h*f+u*d*m,this._z=l*d*m-u*h*f,this._w=l*d*f-u*h*m;break;case"XZY":this._x=u*d*f-l*h*m,this._y=l*h*f-u*d*m,this._z=l*d*m+u*h*f,this._w=l*d*f+u*h*m;break;default:De("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],d=t[6],f=t[10],u=n+o+f;if(u>0){const h=.5/Math.sqrt(u+1);this._w=.25/h,this._x=(d-c)*h,this._y=(r-l)*h,this._z=(a-s)*h}else if(n>o&&n>f){const h=2*Math.sqrt(1+n-o-f);this._w=(d-c)/h,this._x=.25*h,this._y=(s+a)/h,this._z=(r+l)/h}else if(o>f){const h=2*Math.sqrt(1+o-n-f);this._w=(r-l)/h,this._x=(s+a)/h,this._y=.25*h,this._z=(c+d)/h}else{const h=2*Math.sqrt(1+f-n-o);this._w=(a-s)/h,this._x=(r+l)/h,this._y=(c+d)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(qe(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,d=t._w;return this._x=n*d+a*o+s*l-r*c,this._y=s*d+a*c+r*o-n*l,this._z=r*d+a*l+n*c-s*o,this._w=a*d-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),d=Math.sin(l);c=Math.sin(c*l)/d,t=Math.sin(t*l)/d,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const gl=class gl{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Fl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Fl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),d=2*(o*t-r*s),f=2*(r*n-a*t);return this.x=t+c*l+a*f-o*d,this.y=n+c*d+o*l-r*f,this.z=s+c*f+r*d-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return da.copy(this).projectOnVector(e),this.sub(da)}reflect(e){return this.sub(da.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};gl.prototype.isVector3=!0;let w=gl;const da=new w,Fl=new si,vl=class vl{constructor(e,t,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){const d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=c,d[6]=n,d[7]=a,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],d=n[4],f=n[7],u=n[2],h=n[5],m=n[8],_=s[0],g=s[3],p=s[6],y=s[1],E=s[4],S=s[7],R=s[2],A=s[5],v=s[8];return r[0]=a*_+o*y+c*R,r[3]=a*g+o*E+c*A,r[6]=a*p+o*S+c*v,r[1]=l*_+d*y+f*R,r[4]=l*g+d*E+f*A,r[7]=l*p+d*S+f*v,r[2]=u*_+h*y+m*R,r[5]=u*g+h*E+m*A,r[8]=u*p+h*S+m*v,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8];return t*a*d-t*o*l-n*r*d+n*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8],f=d*a-o*l,u=o*c-d*r,h=l*r-a*c,m=t*f+n*u+s*h;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return e[0]=f*_,e[1]=(s*l-d*n)*_,e[2]=(o*n-s*a)*_,e[3]=u*_,e[4]=(d*t-s*c)*_,e[5]=(s*r-o*t)*_,e[6]=h*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Cr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ha.makeScale(e,t)),this}rotate(e){return Cr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ha.makeRotation(-e)),this}translate(e,t){return Cr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ha.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};vl.prototype.isMatrix3=!0;let Ue=vl;const ha=new Ue,Ol=new Ue().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Bl=new Ue().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function lh(){const i={enabled:!0,workingColorSpace:Fr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===nt&&(s.r=qn(s.r),s.g=qn(s.g),s.b=qn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===nt&&(s.r=Ji(s.r),s.g=Ji(s.g),s.b=Ji(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ei?Or:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Fr]:{primaries:e,whitePoint:n,transfer:Or,toXYZ:Ol,fromXYZ:Bl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Kt},outputColorSpaceConfig:{drawingBufferColorSpace:Kt}},[Kt]:{primaries:e,whitePoint:n,transfer:nt,toXYZ:Ol,fromXYZ:Bl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Kt}}}),i}const Ze=lh();function qn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ji(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ci;class ch{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ci===void 0&&(Ci=Br("canvas")),Ci.width=e.width,Ci.height=e.height;const s=Ci.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Ci}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Br("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=qn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(qn(t[n]/255)*255):t[n]=qn(t[n]);return{data:t,width:e.width,height:e.height}}else return De("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let uh=0;class jo{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:uh++}),this.uuid=oi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(fa(s[a].image)):r.push(fa(s[a]))}else r=fa(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function fa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ch.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(De("Texture: Unable to serialize Texture."),{})}let dh=0;const pa=new w;class Bt extends ai{constructor(e=Bt.DEFAULT_IMAGE,t=Bt.DEFAULT_MAPPING,n=zn,s=zn,r=Jt,a=ti,o=Ln,c=sn,l=Bt.DEFAULT_ANISOTROPY,d=ei){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dh++}),this.uuid=oi(),this.name="",this.source=new jo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new re(0,0),this.repeat=new re(1,1),this.center=new re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ue,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(pa).x}get height(){return this.source.getSize(pa).y}get depth(){return this.source.getSize(pa).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){De(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){De(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==tu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ja:e.x=e.x-Math.floor(e.x);break;case zn:e.x=e.x<0?0:1;break;case Qa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ja:e.y=e.y-Math.floor(e.y);break;case zn:e.y=e.y<0?0:1;break;case Qa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Bt.DEFAULT_IMAGE=null;Bt.DEFAULT_MAPPING=tu;Bt.DEFAULT_ANISOTROPY=1;const _l=class _l{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],d=c[4],f=c[8],u=c[1],h=c[5],m=c[9],_=c[2],g=c[6],p=c[10];if(Math.abs(d-u)<.01&&Math.abs(f-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(d+u)<.1&&Math.abs(f+_)<.1&&Math.abs(m+g)<.1&&Math.abs(l+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(l+1)/2,S=(h+1)/2,R=(p+1)/2,A=(d+u)/4,v=(f+_)/4,M=(m+g)/4;return E>S&&E>R?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=A/n,r=v/n):S>R?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=A/s,r=M/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=v/r,s=M/r),this.set(n,s,r,t),this}let y=Math.sqrt((g-m)*(g-m)+(f-_)*(f-_)+(u-d)*(u-d));return Math.abs(y)<.001&&(y=1),this.x=(g-m)/y,this.y=(f-_)/y,this.z=(u-d)/y,this.w=Math.acos((l+h+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this.w=qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this.w=qe(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};_l.prototype.isVector4=!0;let pt=_l;class hh extends ai{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Jt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new pt(0,0,e,t),this.scissorTest=!1,this.viewport=new pt(0,0,e,t),this.textures=[];const s=n.count;for(let r=0;r<s;r++)this.textures[r]=new Bt({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Jt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new jo(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class en extends hh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class mu extends Bt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class fh extends Bt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const qr=class qr{constructor(e,t,n,s,r,a,o,c,l,d,f,u,h,m,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,d,f,u,h,m,_,g)}set(e,t,n,s,r,a,o,c,l,d,f,u,h,m,_,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=d,p[10]=f,p[14]=u,p[3]=h,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new qr().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/Li.setFromMatrixColumn(e,0).length(),r=1/Li.setFromMatrixColumn(e,1).length(),a=1/Li.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),d=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const u=a*d,h=a*f,m=o*d,_=o*f;t[0]=c*d,t[4]=-c*f,t[8]=l,t[1]=h+m*l,t[5]=u-_*l,t[9]=-o*c,t[2]=_-u*l,t[6]=m+h*l,t[10]=a*c}else if(e.order==="YXZ"){const u=c*d,h=c*f,m=l*d,_=l*f;t[0]=u+_*o,t[4]=m*o-h,t[8]=a*l,t[1]=a*f,t[5]=a*d,t[9]=-o,t[2]=h*o-m,t[6]=_+u*o,t[10]=a*c}else if(e.order==="ZXY"){const u=c*d,h=c*f,m=l*d,_=l*f;t[0]=u-_*o,t[4]=-a*f,t[8]=m+h*o,t[1]=h+m*o,t[5]=a*d,t[9]=_-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const u=a*d,h=a*f,m=o*d,_=o*f;t[0]=c*d,t[4]=m*l-h,t[8]=u*l+_,t[1]=c*f,t[5]=_*l+u,t[9]=h*l-m,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const u=a*c,h=a*l,m=o*c,_=o*l;t[0]=c*d,t[4]=_-u*f,t[8]=m*f+h,t[1]=f,t[5]=a*d,t[9]=-o*d,t[2]=-l*d,t[6]=h*f+m,t[10]=u-_*f}else if(e.order==="XZY"){const u=a*c,h=a*l,m=o*c,_=o*l;t[0]=c*d,t[4]=-f,t[8]=l*d,t[1]=u*f+_,t[5]=a*d,t[9]=h*f-m,t[2]=m*f-h,t[6]=o*d,t[10]=_*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ph,e,mh)}lookAt(e,t,n){const s=this.elements;return tn.subVectors(e,t),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),Yn.crossVectors(n,tn),Yn.lengthSq()===0&&(Math.abs(n.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),Yn.crossVectors(n,tn)),Yn.normalize(),Xs.crossVectors(tn,Yn),s[0]=Yn.x,s[4]=Xs.x,s[8]=tn.x,s[1]=Yn.y,s[5]=Xs.y,s[9]=tn.y,s[2]=Yn.z,s[6]=Xs.z,s[10]=tn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],d=n[1],f=n[5],u=n[9],h=n[13],m=n[2],_=n[6],g=n[10],p=n[14],y=n[3],E=n[7],S=n[11],R=n[15],A=s[0],v=s[4],M=s[8],I=s[12],L=s[1],U=s[5],O=s[9],q=s[13],D=s[2],V=s[6],J=s[10],H=s[14],ne=s[3],X=s[7],j=s[11],ee=s[15];return r[0]=a*A+o*L+c*D+l*ne,r[4]=a*v+o*U+c*V+l*X,r[8]=a*M+o*O+c*J+l*j,r[12]=a*I+o*q+c*H+l*ee,r[1]=d*A+f*L+u*D+h*ne,r[5]=d*v+f*U+u*V+h*X,r[9]=d*M+f*O+u*J+h*j,r[13]=d*I+f*q+u*H+h*ee,r[2]=m*A+_*L+g*D+p*ne,r[6]=m*v+_*U+g*V+p*X,r[10]=m*M+_*O+g*J+p*j,r[14]=m*I+_*q+g*H+p*ee,r[3]=y*A+E*L+S*D+R*ne,r[7]=y*v+E*U+S*V+R*X,r[11]=y*M+E*O+S*J+R*j,r[15]=y*I+E*q+S*H+R*ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],d=e[2],f=e[6],u=e[10],h=e[14],m=e[3],_=e[7],g=e[11],p=e[15],y=c*h-l*u,E=o*h-l*f,S=o*u-c*f,R=a*h-l*d,A=a*u-c*d,v=a*f-o*d;return t*(_*y-g*E+p*S)-n*(m*y-g*R+p*A)+s*(m*E-_*R+p*v)-r*(m*S-_*A+g*v)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],d=e[10];return t*(a*d-o*l)-n*(r*d-o*c)+s*(r*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8],f=e[9],u=e[10],h=e[11],m=e[12],_=e[13],g=e[14],p=e[15],y=t*o-n*a,E=t*c-s*a,S=t*l-r*a,R=n*c-s*o,A=n*l-r*o,v=s*l-r*c,M=d*_-f*m,I=d*g-u*m,L=d*p-h*m,U=f*g-u*_,O=f*p-h*_,q=u*p-h*g,D=y*q-E*O+S*U+R*L-A*I+v*M;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const V=1/D;return e[0]=(o*q-c*O+l*U)*V,e[1]=(s*O-n*q-r*U)*V,e[2]=(_*v-g*A+p*R)*V,e[3]=(u*A-f*v-h*R)*V,e[4]=(c*L-a*q-l*I)*V,e[5]=(t*q-s*L+r*I)*V,e[6]=(g*S-m*v-p*E)*V,e[7]=(d*v-u*S+h*E)*V,e[8]=(a*O-o*L+l*M)*V,e[9]=(n*L-t*O-r*M)*V,e[10]=(m*A-_*S+p*y)*V,e[11]=(f*S-d*A-h*y)*V,e[12]=(o*I-a*U-c*M)*V,e[13]=(t*U-n*I+s*M)*V,e[14]=(_*E-m*R-g*y)*V,e[15]=(d*R-f*E+u*y)*V,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,d=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,d*o+n,d*c-s*a,0,l*c-s*o,d*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,d=a+a,f=o+o,u=r*l,h=r*d,m=r*f,_=a*d,g=a*f,p=o*f,y=c*l,E=c*d,S=c*f,R=n.x,A=n.y,v=n.z;return s[0]=(1-(_+p))*R,s[1]=(h+S)*R,s[2]=(m-E)*R,s[3]=0,s[4]=(h-S)*A,s[5]=(1-(u+p))*A,s[6]=(g+y)*A,s[7]=0,s[8]=(m+E)*v,s[9]=(g-y)*v,s[10]=(1-(u+_))*v,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Li.set(s[0],s[1],s[2]).length();const o=Li.set(s[4],s[5],s[6]).length(),c=Li.set(s[8],s[9],s[10]).length();r<0&&(a=-a),vn.copy(this);const l=1/a,d=1/o,f=1/c;return vn.elements[0]*=l,vn.elements[1]*=l,vn.elements[2]*=l,vn.elements[4]*=d,vn.elements[5]*=d,vn.elements[6]*=d,vn.elements[8]*=f,vn.elements[9]*=f,vn.elements[10]*=f,t.setFromRotationMatrix(vn),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,s,r,a,o=bn,c=!1){const l=this.elements,d=2*r/(t-e),f=2*r/(n-s),u=(t+e)/(t-e),h=(n+s)/(n-s);let m,_;if(c)m=r/(a-r),_=a*r/(a-r);else if(o===bn)m=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Is)m=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=f,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=bn,c=!1){const l=this.elements,d=2/(t-e),f=2/(n-s),u=-(t+e)/(t-e),h=-(n+s)/(n-s);let m,_;if(c)m=1/(a-r),_=a/(a-r);else if(o===bn)m=-2/(a-r),_=-(a+r)/(a-r);else if(o===Is)m=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=f,l[9]=0,l[13]=h,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};qr.prototype.isMatrix4=!0;let it=qr;const Li=new w,vn=new it,ph=new w(0,0,0),mh=new w(1,1,1),Yn=new w,Xs=new w,tn=new w,zl=new it,kl=new si;class ri{constructor(e=0,t=0,n=0,s=ri.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],d=s[9],f=s[2],u=s[6],h=s[10];switch(t){case"XYZ":this._y=Math.asin(qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,h),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-qe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,h),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,h),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-qe(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,h),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(qe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,h));break;case"XZY":this._z=Math.asin(-qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,h),this._y=0);break;default:De("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return zl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(zl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return kl.setFromEuler(this),this.setFromQuaternion(kl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ri.DEFAULT_ORDER="XYZ";class el{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let gh=0;const Hl=new w,Pi=new si,In=new it,$s=new w,cs=new w,vh=new w,_h=new si,Gl=new w(1,0,0),Vl=new w(0,1,0),ql=new w(0,0,1),Wl={type:"added"},xh={type:"removed"},Di={type:"childadded",child:null},ma={type:"childremoved",child:null};class mt extends ai{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:gh++}),this.uuid=oi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=mt.DEFAULT_UP.clone();const e=new w,t=new ri,n=new si,s=new w(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new it},normalMatrix:{value:new Ue}}),this.matrix=new it,this.matrixWorld=new it,this.matrixAutoUpdate=mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new el,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Pi.setFromAxisAngle(e,t),this.quaternion.multiply(Pi),this}rotateOnWorldAxis(e,t){return Pi.setFromAxisAngle(e,t),this.quaternion.premultiply(Pi),this}rotateX(e){return this.rotateOnAxis(Gl,e)}rotateY(e){return this.rotateOnAxis(Vl,e)}rotateZ(e){return this.rotateOnAxis(ql,e)}translateOnAxis(e,t){return Hl.copy(e).applyQuaternion(this.quaternion),this.position.add(Hl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Gl,e)}translateY(e){return this.translateOnAxis(Vl,e)}translateZ(e){return this.translateOnAxis(ql,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(In.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?$s.copy(e):$s.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),cs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?In.lookAt(cs,$s,this.up):In.lookAt($s,cs,this.up),this.quaternion.setFromRotationMatrix(In),s&&(In.extractRotation(s.matrixWorld),Pi.setFromRotationMatrix(In),this.quaternion.premultiply(Pi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Qe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Wl),Di.child=e,this.dispatchEvent(Di),Di.child=null):Qe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(xh),ma.child=e,this.dispatchEvent(ma),ma.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),In.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),In.multiply(e.parent.matrixWorld)),e.applyMatrix4(In),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Wl),Di.child=e,this.dispatchEvent(Di),Di.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cs,e,vh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cs,_h,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){const f=c[l];r(e.shapes,f)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),d=a(e.images),f=a(e.shapes),u=a(e.skeletons),h=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),d.length>0&&(n.images=d),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),h.length>0&&(n.animations=h),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){const c=[];for(const l in o){const d=o[l];delete d.metadata,c.push(d)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}mt.DEFAULT_UP=new w(0,1,0);mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class qt extends mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const yh={type:"move"};class ga{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new qt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new qt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new qt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,n),p=this._getHandJoint(l,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.quaternion,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const d=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],u=d.position.distanceTo(f.position),h=.02,m=.005;l.inputState.pinching&&u>h+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=h-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(yh)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new qt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const gu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Kn={h:0,s:0,l:0},Ys={h:0,s:0,l:0};function va(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ae{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ze.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Ze.workingColorSpace){if(e=Ko(e,1),t=qe(t,0,1),n=qe(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=va(a,r,e+1/3),this.g=va(a,r,e),this.b=va(a,r,e-1/3)}return Ze.colorSpaceToWorking(this,s),this}setStyle(e,t=Kt){function n(r){r!==void 0&&parseFloat(r)<1&&De("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:De("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);De("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Kt){const n=gu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):De("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=qn(e.r),this.g=qn(e.g),this.b=qn(e.b),this}copyLinearToSRGB(e){return this.r=Ji(e.r),this.g=Ji(e.g),this.b=Ji(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Kt){return Ze.workingToColorSpace(Ft.copy(this),e),Math.round(qe(Ft.r*255,0,255))*65536+Math.round(qe(Ft.g*255,0,255))*256+Math.round(qe(Ft.b*255,0,255))}getHexString(e=Kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.workingToColorSpace(Ft.copy(this),t);const n=Ft.r,s=Ft.g,r=Ft.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const d=(o+a)/2;if(o===a)c=0,l=0;else{const f=a-o;switch(l=d<=.5?f/(a+o):f/(2-a-o),a){case n:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-n)/f+2;break;case r:c=(n-s)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=d,e}getRGB(e,t=Ze.workingColorSpace){return Ze.workingToColorSpace(Ft.copy(this),t),e.r=Ft.r,e.g=Ft.g,e.b=Ft.b,e}getStyle(e=Kt){Ze.workingToColorSpace(Ft.copy(this),e);const t=Ft.r,n=Ft.g,s=Ft.b;return e!==Kt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Kn),this.setHSL(Kn.h+e,Kn.s+t,Kn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Kn),e.getHSL(Ys);const n=As(Kn.h,Ys.h,t),s=As(Kn.s,Ys.s,t),r=As(Kn.l,Ys.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ft=new Ae;Ae.NAMES=gu;class bh extends mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ri,this.environmentIntensity=1,this.environmentRotation=new ri,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const _n=new w,Nn=new w,_a=new w,Un=new w,Ii=new w,Ni=new w,Xl=new w,xa=new w,ya=new w,ba=new w,Sa=new pt,Ma=new pt,Ea=new pt;class mn{constructor(e=new w,t=new w,n=new w){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),_n.subVectors(e,t),s.cross(_n);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){_n.subVectors(s,t),Nn.subVectors(n,t),_a.subVectors(e,t);const a=_n.dot(_n),o=_n.dot(Nn),c=_n.dot(_a),l=Nn.dot(Nn),d=Nn.dot(_a),f=a*l-o*o;if(f===0)return r.set(0,0,0),null;const u=1/f,h=(l*c-o*d)*u,m=(a*d-o*c)*u;return r.set(1-h-m,m,h)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Un)===null?!1:Un.x>=0&&Un.y>=0&&Un.x+Un.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,Un)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Un.x),c.addScaledVector(a,Un.y),c.addScaledVector(o,Un.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return Sa.setScalar(0),Ma.setScalar(0),Ea.setScalar(0),Sa.fromBufferAttribute(e,t),Ma.fromBufferAttribute(e,n),Ea.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Sa,r.x),a.addScaledVector(Ma,r.y),a.addScaledVector(Ea,r.z),a}static isFrontFacing(e,t,n,s){return _n.subVectors(n,t),Nn.subVectors(e,t),_n.cross(Nn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return _n.subVectors(this.c,this.b),Nn.subVectors(this.a,this.b),_n.cross(Nn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return mn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return mn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return mn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return mn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return mn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Ii.subVectors(s,n),Ni.subVectors(r,n),xa.subVectors(e,n);const c=Ii.dot(xa),l=Ni.dot(xa);if(c<=0&&l<=0)return t.copy(n);ya.subVectors(e,s);const d=Ii.dot(ya),f=Ni.dot(ya);if(d>=0&&f<=d)return t.copy(s);const u=c*f-d*l;if(u<=0&&c>=0&&d<=0&&c-d>0)return a=c/(c-d),t.copy(n).addScaledVector(Ii,a);ba.subVectors(e,r);const h=Ii.dot(ba),m=Ni.dot(ba);if(m>=0&&h<=m)return t.copy(r);const _=h*l-c*m;if(_<=0&&l>=0&&m<=0)return o=l/(l-m),t.copy(n).addScaledVector(Ni,o);const g=d*m-h*f;if(g<=0&&f-d>=0&&h-m>=0)return Xl.subVectors(r,s),o=(f-d)/(f-d+(h-m)),t.copy(s).addScaledVector(Xl,o);const p=1/(g+_+u);return a=_*p,o=u*p,t.copy(n).addScaledVector(Ii,a).addScaledVector(Ni,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class fn{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(xn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(xn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=xn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,xn):xn.fromBufferAttribute(r,a),xn.applyMatrix4(e.matrixWorld),this.expandByPoint(xn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ks.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ks.copy(n.boundingBox)),Ks.applyMatrix4(e.matrixWorld),this.union(Ks)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,xn),xn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(us),Zs.subVectors(this.max,us),Ui.subVectors(e.a,us),Fi.subVectors(e.b,us),Oi.subVectors(e.c,us),Zn.subVectors(Fi,Ui),Jn.subVectors(Oi,Fi),mi.subVectors(Ui,Oi);let t=[0,-Zn.z,Zn.y,0,-Jn.z,Jn.y,0,-mi.z,mi.y,Zn.z,0,-Zn.x,Jn.z,0,-Jn.x,mi.z,0,-mi.x,-Zn.y,Zn.x,0,-Jn.y,Jn.x,0,-mi.y,mi.x,0];return!Ta(t,Ui,Fi,Oi,Zs)||(t=[1,0,0,0,1,0,0,0,1],!Ta(t,Ui,Fi,Oi,Zs))?!1:(Js.crossVectors(Zn,Jn),t=[Js.x,Js.y,Js.z],Ta(t,Ui,Fi,Oi,Zs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,xn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(xn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Fn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Fn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Fn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Fn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Fn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Fn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Fn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Fn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Fn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Fn=[new w,new w,new w,new w,new w,new w,new w,new w],xn=new w,Ks=new fn,Ui=new w,Fi=new w,Oi=new w,Zn=new w,Jn=new w,mi=new w,us=new w,Zs=new w,Js=new w,gi=new w;function Ta(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){gi.fromArray(i,r);const o=s.x*Math.abs(gi.x)+s.y*Math.abs(gi.y)+s.z*Math.abs(gi.z),c=e.dot(gi),l=t.dot(gi),d=n.dot(gi);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>o)return!1}return!0}const _t=new w,Qs=new re;let Sh=0;class Sn extends ai{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Sh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=hu,this.updateRanges=[],this.gpuType=Cn,this.version=0,this._normalizationScale=e!==void 0?Xr(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Qs.fromBufferAttribute(this,t),Qs.applyMatrix3(e),this.setXY(t,Qs.x,Qs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix3(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix4(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyNormalMatrix(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.transformDirection(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){const t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Zo(e,this.array)}_normalize(e){const t=this._normalizationScale;return t!==void 0?Math.round(e*t):Jo(e,this.array)}}class vu extends Sn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class _u extends Sn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Xe extends Sn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Mh=new fn,ds=new w,Aa=new w;class kn{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Mh.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ds.subVectors(e,this.center);const t=ds.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ds,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Aa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ds.copy(e.center).add(Aa)),this.expandByPoint(ds.copy(e.center).sub(Aa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Eh=0;const dn=new it,wa=new mt,Bi=new w,nn=new fn,hs=new fn,wt=new w;class dt extends ai{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Eh++}),this.uuid=oi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Vd(e)?_u:vu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ue().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return dn.makeRotationFromQuaternion(e),this.applyMatrix4(dn),this}rotateX(e){return dn.makeRotationX(e),this.applyMatrix4(dn),this}rotateY(e){return dn.makeRotationY(e),this.applyMatrix4(dn),this}rotateZ(e){return dn.makeRotationZ(e),this.applyMatrix4(dn),this}translate(e,t,n){return dn.makeTranslation(e,t,n),this.applyMatrix4(dn),this}scale(e,t,n){return dn.makeScale(e,t,n),this.applyMatrix4(dn),this}lookAt(e){return wa.lookAt(e),wa.updateMatrix(),this.applyMatrix4(wa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bi).negate(),this.translate(Bi.x,Bi.y,Bi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Xe(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&De("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];nn.setFromBufferAttribute(r),this.morphTargetsRelative?(wt.addVectors(this.boundingBox.min,nn.min),this.boundingBox.expandByPoint(wt),wt.addVectors(this.boundingBox.max,nn.max),this.boundingBox.expandByPoint(wt)):(this.boundingBox.expandByPoint(nn.min),this.boundingBox.expandByPoint(nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new kn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new w,1/0);return}if(e){const n=this.boundingSphere.center;if(nn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];hs.setFromBufferAttribute(o),this.morphTargetsRelative?(wt.addVectors(nn.min,hs.min),nn.expandByPoint(wt),wt.addVectors(nn.max,hs.max),nn.expandByPoint(wt)):(nn.expandByPoint(hs.min),nn.expandByPoint(hs.max))}nn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)wt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(wt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,d=o.count;l<d;l++)wt.fromBufferAttribute(o,l),c&&(Bi.fromBufferAttribute(e,l),wt.add(Bi)),s=Math.max(s,n.distanceToSquared(wt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Qe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Qe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Sn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],c=[],l=new Uint8Array(n.count);for(let I=0;I<n.count;I++)o[I]=new w,c[I]=new w;const d=new w,f=new w,u=new w,h=new re,m=new re,_=new re,g=new w,p=new w;function y(I,L,U){l[I]=l[L]=l[U]=1,d.fromBufferAttribute(n,I),f.fromBufferAttribute(n,L),u.fromBufferAttribute(n,U),h.fromBufferAttribute(r,I),m.fromBufferAttribute(r,L),_.fromBufferAttribute(r,U),f.sub(d),u.sub(d),m.sub(h),_.sub(h);const O=1/(m.x*_.y-_.x*m.y);isFinite(O)&&(g.copy(f).multiplyScalar(_.y).addScaledVector(u,-m.y).multiplyScalar(O),p.copy(u).multiplyScalar(m.x).addScaledVector(f,-_.x).multiplyScalar(O),o[I].add(g),o[L].add(g),o[U].add(g),c[I].add(p),c[L].add(p),c[U].add(p))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let I=0,L=E.length;I<L;++I){const U=E[I],O=U.start,q=U.count;for(let D=O,V=O+q;D<V;D+=3)y(e.getX(D+0),e.getX(D+1),e.getX(D+2))}const S=new w,R=new w,A=new w,v=new w;function M(I){A.fromBufferAttribute(s,I),v.copy(A);const L=o[I];S.copy(L),S.sub(A.multiplyScalar(A.dot(L))).normalize(),R.crossVectors(v,L);const O=R.dot(c[I])<0?-1:1;a.setXYZW(I,S.x,S.y,S.z,O)}for(let I=0,L=n.count;I<L;++I)l[I]&&M(I);this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Sn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,h=n.count;u<h;u++)n.setXYZ(u,0,0,0);const s=new w,r=new w,a=new w,o=new w,c=new w,l=new w,d=new w,f=new w;if(e)for(let u=0,h=e.count;u<h;u+=3){const m=e.getX(u+0),_=e.getX(u+1),g=e.getX(u+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,g),d.subVectors(a,r),f.subVectors(s,r),d.cross(f),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),o.add(d),c.add(d),l.add(d),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let u=0,h=t.count;u<h;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),d.subVectors(a,r),f.subVectors(s,r),d.cross(f),n.setXYZ(u+0,d.x,d.y,d.z),n.setXYZ(u+1,d.x,d.y,d.z),n.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)wt.fromBufferAttribute(e,t),wt.normalize(),e.setXYZ(t,wt.x,wt.y,wt.z)}toNonIndexed(){function e(o,c){const l=o.array,d=o.itemSize,f=o.normalized,u=new l.constructor(c.length*d);let h=0,m=0;for(let _=0,g=c.length;_<g;_++){o.isInterleavedBufferAttribute?h=c[_]*o.data.stride+o.offset:h=c[_]*d;for(let p=0;p<d;p++)u[m++]=l[h++]}return new Sn(u,d,f)}if(this.index===null)return De("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new dt,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let d=0,f=l.length;d<f;d++){const u=l[d],h=e(u,n);c.push(h)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],d=[];for(let f=0,u=l.length;f<u;f++){const h=l[f];d.push(h.toJSON(e.data))}d.length>0&&(s[c]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const d=s[l];this.setAttribute(l,d.clone(t))}const r=e.morphAttributes;for(const l in r){const d=[],f=r[l];for(let u=0,h=f.length;u<h;u++)d.push(f[u].clone(t));this.morphAttributes[l]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,d=a.length;l<d;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Th{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=hu,this.updateRanges=[],this.version=0,this.uuid=oi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});const t=$l(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);const n=new this.array.constructor(e.arrayBuffers[t]),s=new this.constructor(n,this.stride);return s.setUsage(this.usage),s}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});const t=$l(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));const n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}}function $l(i){return i.buffer._uuid===void 0&&(i.buffer._uuid=oi()),i.byteOffset===0&&i.byteLength===i.buffer.byteLength?i.buffer._uuid:i.buffer._uuid+":"+i.byteOffset+":"+i.byteLength}const kt=new w;class kr{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s,this._normalizationScale=e!==void 0?Xr(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix4(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyNormalMatrix(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.transformDirection(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){zr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Sn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new kr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){zr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){const t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Zo(e,this.data.array)}_normalize(e){const t=this._normalizationScale;return t!==void 0?Math.round(e*t):Jo(e,this.data.array)}}const Ra=new w,Ah=new w,wh=new Ue;class wn{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Ra.subVectors(n,t).cross(Ah.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(Ra),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||wh.getNormalMatrix(e),s=this.coplanarPoint(Ra).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Rh=0;class li extends ai{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Rh++}),this.uuid=oi(),this.name="",this.type="Material",this.blending=Es,this.side=Mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Qc,this.blendDst=jc,this.blendEquation=Xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ae(0,0,0),this.blendAlpha=0,this.depthFunc=Ls,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Od,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ua,this.stencilZFail=ua,this.stencilZPass=ua,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){De(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){De(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ae().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new wn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new re().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new re().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class xu extends li{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ae(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let zi;const fs=new w,ki=new w,Hi=new w,Gi=new re,ps=new re,yu=new it,js=new w,ms=new w,er=new w,Yl=new re,Ca=new re,Kl=new re;class Ch extends mt{constructor(e=new xu){if(super(),this.isSprite=!0,this.type="Sprite",zi===void 0){zi=new dt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Th(t,5);zi.setIndex([0,1,2,0,2,3]),zi.setAttribute("position",new kr(n,3,0,!1)),zi.setAttribute("uv",new kr(n,2,3,!1))}this.geometry=zi,this.material=e,this.center=new re(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Qe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ki.setFromMatrixScale(this.matrixWorld),yu.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Hi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ki.multiplyScalar(-Hi.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;tr(js.set(-.5,-.5,0),Hi,a,ki,s,r),tr(ms.set(.5,-.5,0),Hi,a,ki,s,r),tr(er.set(.5,.5,0),Hi,a,ki,s,r),Yl.set(0,0),Ca.set(1,0),Kl.set(1,1);let o=e.ray.intersectTriangle(js,ms,er,!1,fs);if(o===null&&(tr(ms.set(-.5,.5,0),Hi,a,ki,s,r),Ca.set(0,1),o=e.ray.intersectTriangle(js,er,ms,!1,fs),o===null))return;const c=e.ray.origin.distanceTo(fs);c<e.near||c>e.far||t.push({distance:c,point:fs.clone(),uv:mn.getInterpolation(fs,js,ms,er,Yl,Ca,Kl,new re),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}toJSON(e){const t=super.toJSON(e);return t.object.center=this.center.toArray(),t}}function tr(i,e,t,n,s,r){Gi.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(ps.x=r*Gi.x-s*Gi.y,ps.y=s*Gi.x+r*Gi.y):ps.copy(Gi),i.copy(e),i.x+=ps.x,i.y+=ps.y,i.applyMatrix4(yu)}const On=new w,La=new w,nr=new w,ir=new w;class zs{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,On)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=On.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(On.copy(this.origin).addScaledVector(this.direction,t),On.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){La.copy(e).add(t).multiplyScalar(.5),nr.copy(t).sub(e).normalize(),ir.copy(this.origin).sub(La);const r=e.distanceTo(t)*.5,a=-this.direction.dot(nr),o=ir.dot(this.direction),c=-ir.dot(nr),l=ir.lengthSq(),d=Math.abs(1-a*a);let f,u,h,m;if(d>0)if(f=a*c-o,u=a*o-c,m=r*d,f>=0)if(u>=-m)if(u<=m){const _=1/d;f*=_,u*=_,h=f*(f+a*u+2*o)+u*(a*f+u+2*c)+l}else u=r,f=Math.max(0,-(a*u+o)),h=-f*f+u*(u+2*c)+l;else u=-r,f=Math.max(0,-(a*u+o)),h=-f*f+u*(u+2*c)+l;else u<=-m?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-c),r),h=-f*f+u*(u+2*c)+l):u<=m?(f=0,u=Math.min(Math.max(-r,-c),r),h=u*(u+2*c)+l):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-c),r),h=-f*f+u*(u+2*c)+l);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),h=-f*f+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(La).addScaledVector(nr,u),h}intersectSphere(e,t){if(e.radius<0)return null;On.subVectors(e.center,this.origin);const n=On.dot(this.direction),s=On.dot(On)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c;const l=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),d>=0?(r=(e.min.y-u.y)*d,a=(e.max.y-u.y)*d):(r=(e.max.y-u.y)*d,a=(e.min.y-u.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-u.z)*f,c=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,c=(e.min.z-u.z)*f),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,On)!==null}intersectTriangle(e,t,n,s,r){const a=this.origin,o=this.direction,c=o.x,l=o.y,d=o.z,f=e.x-a.x,u=e.y-a.y,h=e.z-a.z,m=t.x-a.x,_=t.y-a.y,g=t.z-a.z,p=n.x-a.x,y=n.y-a.y,E=n.z-a.z,S=Math.abs(c),R=Math.abs(l),A=Math.abs(d);let v,M,I,L,U,O,q,D,V,J,H,ne;if(S>=R&&S>=A?(I=c,O=f,V=m,ne=p,c>=0?(v=l,M=d,L=u,U=h,q=_,D=g,J=y,H=E):(v=d,M=l,L=h,U=u,q=g,D=_,J=E,H=y)):R>=A?(I=l,O=u,V=_,ne=y,l>=0?(v=d,M=c,L=h,U=f,q=g,D=m,J=E,H=p):(v=c,M=d,L=f,U=h,q=m,D=g,J=p,H=E)):(I=d,O=h,V=g,ne=E,d>=0?(v=c,M=l,L=f,U=u,q=m,D=_,J=p,H=y):(v=l,M=c,L=u,U=f,q=_,D=m,J=y,H=p)),I===0)return null;const X=v/I,j=M/I,ee=1/I,Ee=L-X*O,Fe=U-j*O,K=q-X*V,ge=D-j*V,be=J-X*ne,Le=H-j*ne,ve=be*ge-Le*K,Be=Ee*Le-Fe*be,gt=K*Fe-ge*Ee;if(s){if(ve<0||Be<0||gt<0)return null}else if((ve<0||Be<0||gt<0)&&(ve>0||Be>0||gt>0))return null;const Ie=ve+Be+gt;if(Ie===0)return null;const st=ee*(ve*O+Be*V+gt*ne);return(Ie>0?st<0:st>0)?null:this.at(st/Ie,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class hn extends li{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ae(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ri,this.combine=eu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Zl=new it,vi=new zs,sr=new kn,Jl=new w,rr=new w,ar=new w,or=new w,Pa=new w,lr=new w,Ql=new w,cr=new w;class We extends mt{constructor(e=new dt,t=new hn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){lr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const d=o[c],f=r[c];d!==0&&(Pa.fromBufferAttribute(f,e),a?lr.addScaledVector(Pa,d):lr.addScaledVector(Pa.sub(t),d))}t.add(lr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),sr.copy(n.boundingSphere),sr.applyMatrix4(r),vi.copy(e.ray).recast(e.near),!(sr.containsPoint(vi.origin)===!1&&(vi.intersectSphere(sr,Jl)===null||vi.origin.distanceToSquared(Jl)>(e.far-e.near)**2))&&(Zl.copy(r).invert(),vi.copy(e.ray).applyMatrix4(Zl),!(n.boundingBox!==null&&vi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,vi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,d=r.attributes.uv1,f=r.attributes.normal,u=r.groups,h=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=u.length;m<_;m++){const g=u[m],p=a[g.materialIndex],y=Math.max(g.start,h.start),E=Math.min(o.count,Math.min(g.start+g.count,h.start+h.count));for(let S=y,R=E;S<R;S+=3){const A=o.getX(S),v=o.getX(S+1),M=o.getX(S+2);s=ur(this,p,e,n,l,d,f,A,v,M),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const m=Math.max(0,h.start),_=Math.min(o.count,h.start+h.count);for(let g=m,p=_;g<p;g+=3){const y=o.getX(g),E=o.getX(g+1),S=o.getX(g+2);s=ur(this,a,e,n,l,d,f,y,E,S),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let m=0,_=u.length;m<_;m++){const g=u[m],p=a[g.materialIndex],y=Math.max(g.start,h.start),E=Math.min(c.count,Math.min(g.start+g.count,h.start+h.count));for(let S=y,R=E;S<R;S+=3){const A=S,v=S+1,M=S+2;s=ur(this,p,e,n,l,d,f,A,v,M),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const m=Math.max(0,h.start),_=Math.min(c.count,h.start+h.count);for(let g=m,p=_;g<p;g+=3){const y=g,E=g+1,S=g+2;s=ur(this,a,e,n,l,d,f,y,E,S),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}}function Lh(i,e,t,n,s,r,a,o){let c;if(e.side===Wt?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===Mi,o),c===null)return null;cr.copy(o),cr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(cr);return l<t.near||l>t.far?null:{distance:l,point:cr.clone(),object:i}}function ur(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,rr),i.getVertexPosition(c,ar),i.getVertexPosition(l,or);const d=Lh(i,e,t,n,rr,ar,or,Ql);if(d){const f=new w;mn.getBarycoord(Ql,rr,ar,or,f),s&&(d.uv=mn.getInterpolatedAttribute(s,o,c,l,f,new re)),r&&(d.uv1=mn.getInterpolatedAttribute(r,o,c,l,f,new re)),a&&(d.normal=mn.getInterpolatedAttribute(a,o,c,l,f,new w),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new w,materialIndex:0};mn.getNormal(rr,ar,or,u.normal),d.face=u,d.barycoord=f}return d}class Ph extends Bt{constructor(e=null,t=1,n=1,s,r,a,o,c,l=Lt,d=Lt,f,u){super(null,a,o,c,l,d,s,r,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const _i=new kn,Dh=new re(.5,.5),dr=new w;class Us{constructor(e=new wn,t=new wn,n=new wn,s=new wn,r=new wn,a=new wn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=bn,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],d=r[4],f=r[5],u=r[6],h=r[7],m=r[8],_=r[9],g=r[10],p=r[11],y=r[12],E=r[13],S=r[14],R=r[15];if(s[0].setComponents(l-a,h-d,p-m,R-y).normalize(),s[1].setComponents(l+a,h+d,p+m,R+y).normalize(),s[2].setComponents(l+o,h+f,p+_,R+E).normalize(),s[3].setComponents(l-o,h-f,p-_,R-E).normalize(),n)s[4].setComponents(c,u,g,S).normalize(),s[5].setComponents(l-c,h-u,p-g,R-S).normalize();else if(s[4].setComponents(l-c,h-u,p-g,R-S).normalize(),t===bn)s[5].setComponents(l+c,h+u,p+g,R+S).normalize();else if(t===Is)s[5].setComponents(c,u,g,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),_i.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),_i.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(_i)}intersectsSprite(e){_i.center.set(0,0,0);const t=Dh.distanceTo(e.center);return _i.radius=.7071067811865476+t,_i.applyMatrix4(e.matrixWorld),this.intersectsSphere(_i)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(dr.x=s.normal.x>0?e.max.x:e.min.x,dr.y=s.normal.y>0?e.max.y:e.min.y,dr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(dr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const jl=new it;class tl{constructor(){this.coordinateSystem=bn,this._frustums=[],this._count=0}setFromArrayCamera(e){const t=e.cameras,n=this._frustums;for(let s=0;s<t.length;s++){const r=t[s];jl.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new Us),n[s].setFromProjectionMatrix(jl,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;const t=this._frustums,n=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new Us),t[s].copy(n[s]);return this._count=e._count,this}clone(){return new tl().copy(this)}}class bu extends li{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ae(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Hr=new w,Gr=new w,ec=new it,gs=new zs,hr=new kn,Da=new w,tc=new w;class Ih extends mt{constructor(e=new dt,t=new bu){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Hr.fromBufferAttribute(t,s-1),Gr.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Hr.distanceTo(Gr);e.setAttribute("lineDistance",new Xe(n,1))}else De("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),hr.copy(n.boundingSphere),hr.applyMatrix4(s),hr.radius+=r,e.ray.intersectsSphere(hr)===!1)return;ec.copy(s).invert(),gs.copy(e.ray).applyMatrix4(ec);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,d=n.index,u=n.attributes.position;if(d!==null){const h=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let _=h,g=m-1;_<g;_+=l){const p=d.getX(_),y=d.getX(_+1),E=fr(this,e,gs,c,p,y,_);E&&t.push(E)}if(this.isLineLoop){const _=d.getX(m-1),g=d.getX(h),p=fr(this,e,gs,c,_,g,m-1);p&&t.push(p)}}else{const h=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let _=h,g=m-1;_<g;_+=l){const p=fr(this,e,gs,c,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=fr(this,e,gs,c,m-1,h,m-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function fr(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(Hr.fromBufferAttribute(o,s),Gr.fromBufferAttribute(o,r),t.distanceSqToSegment(Hr,Gr,Da,tc)>n)return;Da.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Da);if(!(l<e.near||l>e.far))return{distance:l,point:tc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const nc=new w,ic=new w;class Nh extends Ih{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)nc.fromBufferAttribute(t,s),ic.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+nc.distanceTo(ic);e.setAttribute("lineDistance",new Xe(n,1))}else De("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Lr extends li{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ae(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const sc=new it,Po=new zs,pr=new kn,mr=new w;class Ia extends mt{constructor(e=new dt,t=new Lr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),pr.copy(n.boundingSphere),pr.applyMatrix4(s),pr.radius+=r,e.ray.intersectsSphere(pr)===!1)return;sc.copy(s).invert(),Po.copy(e.ray).applyMatrix4(sc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,f=n.attributes.position;if(l!==null){const u=Math.max(0,a.start),h=Math.min(l.count,a.start+a.count);for(let m=u,_=h;m<_;m++){const g=l.getX(m);mr.fromBufferAttribute(f,g),rc(mr,g,c,s,e,t,this)}}else{const u=Math.max(0,a.start),h=Math.min(f.count,a.start+a.count);for(let m=u,_=h;m<_;m++)mr.fromBufferAttribute(f,m),rc(mr,m,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function rc(i,e,t,n,s,r,a){const o=Po.distanceSqToPoint(i);if(o<t){const c=new w;Po.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Su extends Bt{constructor(e=[],t=ji,n,s,r,a,o,c,l,d){super(e,t,n,s,r,a,o,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Uh extends Bt{constructor(e,t,n,s,r,a,o,c,l){super(e,t,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ts extends Bt{constructor(e,t,n=Pn,s,r,a,o=Lt,c=Lt,l,d=ii,f=1){if(d!==ii&&d!==ni)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:f};super(u,s,r,a,o,c,d,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new jo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Mu extends ts{constructor(e,t=Pn,n=ji,s,r,a=Lt,o=Lt,c,l=ii){const d={width:e,height:e,depth:1},f=[d,d,d,d,d,d];super(e,e,t,n,s,r,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Eu extends Bt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class rs extends dt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],d=[],f=[];let u=0,h=0;m("z","y","x",-1,-1,n,t,e,a,r,0),m("z","y","x",1,-1,n,t,-e,a,r,1),m("x","z","y",1,1,e,n,t,s,a,2),m("x","z","y",1,-1,e,n,-t,s,a,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Xe(l,3)),this.setAttribute("normal",new Xe(d,3)),this.setAttribute("uv",new Xe(f,2));function m(_,g,p,y,E,S,R,A,v,M,I){const L=S/v,U=R/M,O=S/2,q=R/2,D=A/2,V=v+1,J=M+1;let H=0,ne=0;const X=new w;for(let j=0;j<J;j++){const ee=j*U-q;for(let Ee=0;Ee<V;Ee++){const Fe=Ee*L-O;X[_]=Fe*y,X[g]=ee*E,X[p]=D,l.push(X.x,X.y,X.z),X[_]=0,X[g]=0,X[p]=A>0?1:-1,d.push(X.x,X.y,X.z),f.push(Ee/v),f.push(1-j/M),H+=1}}for(let j=0;j<M;j++)for(let ee=0;ee<v;ee++){const Ee=u+ee+V*j,Fe=u+ee+V*(j+1),K=u+(ee+1)+V*(j+1),ge=u+(ee+1)+V*j;c.push(Ee,Fe,ge),c.push(Fe,K,ge),ne+=6}o.addGroup(h,ne,I),h+=ne,u+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Fs extends dt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const d=[],f=[],u=[],h=[];let m=0;const _=[],g=n/2;let p=0;y(),a===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(d),this.setAttribute("position",new Xe(f,3)),this.setAttribute("normal",new Xe(u,3)),this.setAttribute("uv",new Xe(h,2));function y(){const S=new w,R=new w;let A=0;const v=(t-e)/n;for(let M=0;M<=r;M++){const I=[],L=M/r,U=L*(t-e)+e;for(let O=0;O<=s;O++){const q=O/s,D=q*c+o,V=Math.sin(D),J=Math.cos(D);R.x=U*V,R.y=-L*n+g,R.z=U*J,f.push(R.x,R.y,R.z),S.set(V,v,J).normalize(),u.push(S.x,S.y,S.z),h.push(q,1-L),I.push(m++)}_.push(I)}for(let M=0;M<s;M++)for(let I=0;I<r;I++){const L=_[I][M],U=_[I+1][M],O=_[I+1][M+1],q=_[I][M+1];(e>0||I!==0)&&(d.push(L,U,q),A+=3),(t>0||I!==r-1)&&(d.push(U,O,q),A+=3)}l.addGroup(p,A,0),p+=A}function E(S){const R=m,A=new re,v=new w;let M=0;const I=S===!0?e:t,L=S===!0?1:-1;for(let O=1;O<=s;O++)f.push(0,g*L,0),u.push(0,L,0),h.push(.5,.5),m++;const U=m;for(let O=0;O<=s;O++){const D=O/s*c+o,V=Math.cos(D),J=Math.sin(D);v.x=I*J,v.y=g*L,v.z=I*V,f.push(v.x,v.y,v.z),u.push(0,L,0),A.x=V*.5+.5,A.y=J*.5*L+.5,h.push(A.x,A.y),m++}for(let O=0;O<s;O++){const q=R+O,D=U+O;S===!0?d.push(D,D+1,q):d.push(D+1,D,q),M+=3}l.addGroup(p,M,S===!0?1:2),p+=M}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fs(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class $r extends Fs{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new $r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Yr extends dt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];o(s),l(n),d(),this.setAttribute("position",new Xe(r,3)),this.setAttribute("normal",new Xe(r.slice(),3)),this.setAttribute("uv",new Xe(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(y){const E=new w,S=new w,R=new w;for(let A=0;A<t.length;A+=3)h(t[A+0],E),h(t[A+1],S),h(t[A+2],R),c(E,S,R,y)}function c(y,E,S,R){const A=R+1,v=[];for(let M=0;M<=A;M++){v[M]=[];const I=y.clone().lerp(S,M/A),L=E.clone().lerp(S,M/A),U=A-M;for(let O=0;O<=U;O++)O===0&&M===A?v[M][O]=I:v[M][O]=I.clone().lerp(L,O/U)}for(let M=0;M<A;M++)for(let I=0;I<2*(A-M)-1;I++){const L=Math.floor(I/2);I%2===0?(u(v[M][L+1]),u(v[M+1][L]),u(v[M][L])):(u(v[M][L+1]),u(v[M+1][L+1]),u(v[M+1][L]))}}function l(y){const E=new w;for(let S=0;S<r.length;S+=3)E.x=r[S+0],E.y=r[S+1],E.z=r[S+2],E.normalize().multiplyScalar(y),r[S+0]=E.x,r[S+1]=E.y,r[S+2]=E.z}function d(){const y=new w;for(let E=0;E<r.length;E+=3){y.x=r[E+0],y.y=r[E+1],y.z=r[E+2];const S=g(y)/2/Math.PI+.5,R=p(y)/Math.PI+.5;a.push(S,1-R)}m(),f()}function f(){for(let y=0;y<a.length;y+=6){const E=a[y+0],S=a[y+2],R=a[y+4],A=Math.max(E,S,R),v=Math.min(E,S,R);A>.9&&v<.1&&(E<.2&&(a[y+0]+=1),S<.2&&(a[y+2]+=1),R<.2&&(a[y+4]+=1))}}function u(y){r.push(y.x,y.y,y.z)}function h(y,E){const S=y*3;E.x=e[S+0],E.y=e[S+1],E.z=e[S+2]}function m(){const y=new w,E=new w,S=new w,R=new w,A=new re,v=new re,M=new re;for(let I=0,L=0;I<r.length;I+=9,L+=6){y.set(r[I+0],r[I+1],r[I+2]),E.set(r[I+3],r[I+4],r[I+5]),S.set(r[I+6],r[I+7],r[I+8]),A.set(a[L+0],a[L+1]),v.set(a[L+2],a[L+3]),M.set(a[L+4],a[L+5]),R.copy(y).add(E).add(S).divideScalar(3);const U=g(R);_(A,L+0,y,U),_(v,L+2,E,U),_(M,L+4,S,U)}}function _(y,E,S,R){R<0&&y.x===1&&(a[E]=y.x-1),S.x===0&&S.z===0&&(a[E]=R/2/Math.PI+.5)}function g(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yr(e.vertices,e.indices,e.radius,e.detail)}}class Wn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){De("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);const d=n[s],u=n[s+1]-d,h=(a-d)/u;return(s+h)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),c=t||(a.isVector2?new re:new w);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new w,s=[],r=[],a=[],o=new w,c=new it;for(let h=0;h<=e;h++){const m=h/e;s[h]=this.getTangentAt(m,new w)}r[0]=new w,a[0]=new w;let l=Number.MAX_VALUE;const d=Math.abs(s[0].x),f=Math.abs(s[0].y),u=Math.abs(s[0].z);d<=l&&(l=d,n.set(1,0,0)),f<=l&&(l=f,n.set(0,1,0)),u<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let h=1;h<=e;h++){if(r[h]=r[h-1].clone(),a[h]=a[h-1].clone(),o.crossVectors(s[h-1],s[h]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(qe(s[h-1].dot(s[h]),-1,1));r[h].applyMatrix4(c.makeRotationAxis(o,m))}a[h].crossVectors(s[h],r[h])}if(t===!0){let h=Math.acos(qe(r[0].dot(r[e]),-1,1));h/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(h=-h);for(let m=1;m<=e;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],h*m)),a[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}}class Tu extends Wn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new re){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const d=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=c-this.aX,h=l-this.aY;c=u*d-h*f+this.aX,l=u*f+h*d+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Fh extends Tu{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function nl(){let i=0,e=0,t=0,n=0;function s(r,a,o,c){i=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,d,f){let u=(a-r)/l-(o-r)/(l+d)+(o-a)/d,h=(o-a)/d-(c-a)/(d+f)+(c-o)/f;u*=d,h*=d,s(a,o,u,h)},calc:function(r){const a=r*r,o=a*r;return i+e*r+t*a+n*o}}}const ac=new w,oc=new w,Na=new nl,Ua=new nl,Fa=new nl;class il extends Wn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new w){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,d;this.closed||o>0?l=s[(o-1)%r]:(oc.subVectors(s[0],s[1]).add(s[0]),l=oc);const f=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?d=s[(o+2)%r]:(ac.subVectors(s[r-1],s[r-2]).add(s[r-1]),d=ac),this.curveType==="centripetal"||this.curveType==="chordal"){const h=this.curveType==="chordal"?.5:.25;let m=Math.pow(l.distanceToSquared(f),h),_=Math.pow(f.distanceToSquared(u),h),g=Math.pow(u.distanceToSquared(d),h);_<1e-4&&(_=1),m<1e-4&&(m=_),g<1e-4&&(g=_),Na.initNonuniformCatmullRom(l.x,f.x,u.x,d.x,m,_,g),Ua.initNonuniformCatmullRom(l.y,f.y,u.y,d.y,m,_,g),Fa.initNonuniformCatmullRom(l.z,f.z,u.z,d.z,m,_,g)}else this.curveType==="catmullrom"&&(Na.initCatmullRom(l.x,f.x,u.x,d.x,this.tension),Ua.initCatmullRom(l.y,f.y,u.y,d.y,this.tension),Fa.initCatmullRom(l.z,f.z,u.z,d.z,this.tension));return n.set(Na.calc(c),Ua.calc(c),Fa.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new w().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function lc(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,o=i*i,c=i*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*i+t}function Oh(i,e){const t=1-i;return t*t*e}function Bh(i,e){return 2*(1-i)*i*e}function zh(i,e){return i*i*e}function ws(i,e,t,n){return Oh(i,e)+Bh(i,t)+zh(i,n)}function kh(i,e){const t=1-i;return t*t*t*e}function Hh(i,e){const t=1-i;return 3*t*t*i*e}function Gh(i,e){return 3*(1-i)*i*i*e}function Vh(i,e){return i*i*i*e}function Rs(i,e,t,n,s){return kh(i,e)+Hh(i,t)+Gh(i,n)+Vh(i,s)}class qh extends Wn{constructor(e=new re,t=new re,n=new re,s=new re){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new re){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Rs(e,s.x,r.x,a.x,o.x),Rs(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Wh extends Wn{constructor(e=new w,t=new w,n=new w,s=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new w){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Rs(e,s.x,r.x,a.x,o.x),Rs(e,s.y,r.y,a.y,o.y),Rs(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Xh extends Wn{constructor(e=new re,t=new re){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new re){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new re){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class $h extends Wn{constructor(e=new w,t=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new w){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new w){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Yh extends Wn{constructor(e=new re,t=new re,n=new re){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new re){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(ws(e,s.x,r.x,a.x),ws(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Au extends Wn{constructor(e=new w,t=new w,n=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new w){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(ws(e,s.x,r.x,a.x),ws(e,s.y,r.y,a.y),ws(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Kh extends Wn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new re){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],d=s[a>s.length-2?s.length-1:a+1],f=s[a>s.length-3?s.length-1:a+2];return n.set(lc(o,c.x,l.x,d.x,f.x),lc(o,c.y,l.y,d.y,f.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new re().fromArray(s))}return this}}var Zh=Object.freeze({__proto__:null,ArcCurve:Fh,CatmullRomCurve3:il,CubicBezierCurve:qh,CubicBezierCurve3:Wh,EllipseCurve:Tu,LineCurve:Xh,LineCurve3:$h,QuadraticBezierCurve:Yh,QuadraticBezierCurve3:Au,SplineCurve:Kh});class Cs extends Yr{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Cs(e.radius,e.detail)}}class ks extends dt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,d=c+1,f=e/o,u=t/c,h=[],m=[],_=[],g=[];for(let p=0;p<d;p++){const y=p*u-a;for(let E=0;E<l;E++){const S=E*f-r;m.push(S,-y,0),_.push(0,0,1),g.push(E/o),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let y=0;y<o;y++){const E=y+l*p,S=y+l*(p+1),R=y+1+l*(p+1),A=y+1+l*p;h.push(E,S,A),h.push(S,R,A)}this.setIndex(h),this.setAttribute("position",new Xe(m,3)),this.setAttribute("normal",new Xe(_,3)),this.setAttribute("uv",new Xe(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ks(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ki extends dt{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],c=[],l=[],d=[];let f=e;const u=(t-e)/s,h=new w,m=new re;for(let _=0;_<=s;_++){for(let g=0;g<=n;g++){const p=r+g/n*a;h.x=f*Math.cos(p),h.y=f*Math.sin(p),c.push(h.x,h.y,h.z),l.push(0,0,1),m.x=(h.x/t+1)/2,m.y=(h.y/t+1)/2,d.push(m.x,m.y)}f+=u}for(let _=0;_<s;_++){const g=_*(n+1);for(let p=0;p<n;p++){const y=p+g,E=y,S=y+n+1,R=y+n+2,A=y+1;o.push(E,S,A),o.push(S,R,A)}}this.setIndex(o),this.setAttribute("position",new Xe(c,3)),this.setAttribute("normal",new Xe(l,3)),this.setAttribute("uv",new Xe(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ki(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Vt extends dt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const d=[],f=new w,u=new w,h=[],m=[],_=[],g=[];for(let p=0;p<=n;p++){const y=[],E=p/n,S=a+E*o,R=e*Math.cos(S),A=Math.sqrt(e*e-R*R);let v=0;p===0&&a===0?v=.5/t:p===n&&c===Math.PI&&(v=-.5/t);for(let M=0;M<=t;M++){const I=M/t,L=s+I*r;f.x=-A*Math.cos(L),f.y=R,f.z=A*Math.sin(L),m.push(f.x,f.y,f.z),u.copy(f).normalize(),_.push(u.x,u.y,u.z),g.push(I+v,1-E),y.push(l++)}d.push(y)}for(let p=0;p<n;p++)for(let y=0;y<t;y++){const E=d[p][y+1],S=d[p][y],R=d[p+1][y],A=d[p+1][y+1];(p!==0||a>0)&&h.push(E,S,A),(p!==n-1||c<Math.PI)&&h.push(S,R,A)}this.setIndex(h),this.setAttribute("position",new Xe(m,3)),this.setAttribute("normal",new Xe(_,3)),this.setAttribute("uv",new Xe(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vt(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class sl extends Yr{constructor(e=1,t=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],s=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,s,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new sl(e.radius,e.detail)}}class Hs extends dt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);const c=[],l=[],d=[],f=[],u=new w,h=new w,m=new w;for(let _=0;_<=n;_++){const g=a+_/n*o;for(let p=0;p<=s;p++){const y=p/s*r;h.x=(e+t*Math.cos(g))*Math.cos(y),h.y=(e+t*Math.cos(g))*Math.sin(y),h.z=t*Math.sin(g),l.push(h.x,h.y,h.z),u.x=e*Math.cos(y),u.y=e*Math.sin(y),m.subVectors(h,u).normalize(),d.push(m.x,m.y,m.z),f.push(p/s),f.push(_/n)}}for(let _=1;_<=n;_++)for(let g=1;g<=s;g++){const p=(s+1)*_+g-1,y=(s+1)*(_-1)+g-1,E=(s+1)*(_-1)+g,S=(s+1)*_+g;c.push(p,y,S),c.push(y,E,S)}this.setIndex(c),this.setAttribute("position",new Xe(l,3)),this.setAttribute("normal",new Xe(d,3)),this.setAttribute("uv",new Xe(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hs(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}}class rl extends dt{constructor(e=new Au(new w(-1,-1,0),new w(-1,1,0),new w(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new w,c=new w,l=new re;let d=new w;const f=[],u=[],h=[],m=[];_(),this.setIndex(m),this.setAttribute("position",new Xe(f,3)),this.setAttribute("normal",new Xe(u,3)),this.setAttribute("uv",new Xe(h,2));function _(){for(let E=0;E<t;E++)g(E);g(r===!1?t:0),y(),p()}function g(E){d=e.getPointAt(E/t,d);const S=a.normals[E],R=a.binormals[E];for(let A=0;A<=s;A++){const v=A/s*Math.PI*2,M=Math.sin(v),I=-Math.cos(v);c.x=I*S.x+M*R.x,c.y=I*S.y+M*R.y,c.z=I*S.z+M*R.z,c.normalize(),u.push(c.x,c.y,c.z),o.x=d.x+n*c.x,o.y=d.y+n*c.y,o.z=d.z+n*c.z,f.push(o.x,o.y,o.z)}}function p(){for(let E=1;E<=t;E++)for(let S=1;S<=s;S++){const R=(s+1)*(E-1)+(S-1),A=(s+1)*E+(S-1),v=(s+1)*E+S,M=(s+1)*(E-1)+S;m.push(R,A,M),m.push(A,v,M)}}function y(){for(let E=0;E<=t;E++)for(let S=0;S<=s;S++)l.x=E/t,l.y=S/s,h.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new rl(new Zh[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}function ns(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(cc(s))s.isRenderTargetTexture?(De("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(cc(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Ht(i){const e={};for(let t=0;t<i.length;t++){const n=ns(i[t]);for(const s in n)e[s]=n[s]}return e}function cc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Jh(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function wu(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ze.workingColorSpace}const Os={clone:ns,merge:Ht};var Qh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,jh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Qt extends li{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Qh,this.fragmentShader=jh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ns(e.uniforms),this.uniformsGroups=Jh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Ae().setHex(s.value);break;case"v2":this.uniforms[n].value=new re().fromArray(s.value);break;case"v3":this.uniforms[n].value=new w().fromArray(s.value);break;case"v4":this.uniforms[n].value=new pt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ue().fromArray(s.value);break;case"m4":this.uniforms[n].value=new it().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Ru extends Qt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Yt extends li{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ae(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ae(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Lo,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ri,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ef extends li{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ud,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class tf extends li{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Kr extends mt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ae(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class nf extends Kr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ae(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Oa=new it,uc=new w,dc=new w;class Cu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new re(512,512),this.mapType=sn,this.map=null,this.mapPass=null,this.matrix=new it,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Us,this._frameExtents=new re(1,1),this._viewportCount=1,this._viewports=[new pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;uc.setFromMatrixPosition(e.matrixWorld),t.position.copy(uc),dc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(dc),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){Oa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Oa,e.coordinateSystem,e.reversedDepth);const r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===Is||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(Oa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const gr=new w,vr=new si,Tn=new w;class Lu extends mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new it,this.projectionMatrix=new it,this.projectionMatrixInverse=new it,this.coordinateSystem=bn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(gr,vr,Tn),Tn.x===1&&Tn.y===1&&Tn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(gr,vr,Tn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(gr,vr,Tn),Tn.x===1&&Tn.y===1&&Tn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(gr,vr,Tn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Qn=new w,hc=new re,fc=new re;class pn extends Lu{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ns*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ts*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ns*2*Math.atan(Math.tan(Ts*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Qn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Qn.x,Qn.y).multiplyScalar(-e/Qn.z),Qn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Qn.x,Qn.y).multiplyScalar(-e/Qn.z)}getViewSize(e,t){return this.getViewBounds(e,hc,fc),t.subVectors(fc,hc)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ts*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class sf extends Cu{constructor(){super(new pn(90,1,.5,500)),this.isPointLightShadow=!0}}class rf extends Kr{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new sf}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class al extends Lu{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=d*this.view.offsetY,c=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class af extends Cu{constructor(){super(new al(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ba extends Kr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.shadow=new af}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class of extends Kr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Vi=-90,qi=1;class Do extends mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new pn(Vi,qi,e,t);s.layers=this.layers,this.add(s);const r=new pn(Vi,qi,e,t);r.layers=this.layers,this.add(r);const a=new pn(Vi,qi,e,t);a.layers=this.layers,this.add(a);const o=new pn(Vi,qi,e,t);o.layers=this.layers,this.add(o);const c=new pn(Vi,qi,e,t);c.layers=this.layers,this.add(c);const l=new pn(Vi,qi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===bn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Is)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,d]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.mipmapsAutoUpdate=_,e.setRenderTarget(n,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(f,u,h),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class lf extends pn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}}class cf{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=uf.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function uf(){this._document.hidden===!1&&this.reset()}const pc=new it;class df{constructor(e,t,n=0,s=1/0){this.ray=new zs(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new el,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Qe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return pc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(pc),this}intersectObject(e,t=!0,n=[]){return Io(e,this,n,t),n.sort(mc),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Io(e[s],this,n,t);return n.sort(mc),n}}function mc(i,e){return i.distance-e.distance}function Io(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Io(r[a],e,t,!0)}}class hf{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,De("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}class gc{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=qe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(qe(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class ff extends Nh{constructor(e=10,t=16,n=8,s=64,r=4473924,a=8947848){r=new Ae(r),a=new Ae(a);const o=[],c=[];if(t>1)for(let f=0;f<t;f++){const u=f/t*(Math.PI*2),h=Math.sin(u)*e,m=Math.cos(u)*e;o.push(0,0,0),o.push(h,0,m);const _=f&1?r:a;c.push(_.r,_.g,_.b),c.push(_.r,_.g,_.b)}for(let f=0;f<n;f++){const u=f&1?r:a,h=e-e/n*f;for(let m=0;m<s;m++){let _=m/s*(Math.PI*2),g=Math.sin(_)*h,p=Math.cos(_)*h;o.push(g,0,p),c.push(u.r,u.g,u.b),_=(m+1)/s*(Math.PI*2),g=Math.sin(_)*h,p=Math.cos(_)*h,o.push(g,0,p),c.push(u.r,u.g,u.b)}}const l=new dt;l.setAttribute("position",new Xe(o,3)),l.setAttribute("color",new Xe(c,3));const d=new bu({vertexColors:!0,toneMapped:!1});super(l,d),this.type="PolarGridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}}class pf extends ai{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function vc(i,e,t,n){const s=mf(n);switch(t){case au:return i*e;case lu:return i*e/s.components*s.byteLength;case Xo:return i*e/s.components*s.byteLength;case Ei:return i*e*2/s.components*s.byteLength;case $o:return i*e*2/s.components*s.byteLength;case ou:return i*e*3/s.components*s.byteLength;case Ln:return i*e*4/s.components*s.byteLength;case Yo:return i*e*4/s.components*s.byteLength;case Tr:case Ar:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case wr:case Rr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case eo:case no:return Math.max(i,16)*Math.max(e,8)/4;case ja:case to:return Math.max(i,8)*Math.max(e,8)/2;case io:case so:case ao:case oo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ro:case Nr:case lo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case co:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case uo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ho:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case fo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case po:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case mo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case go:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case vo:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case _o:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case xo:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case yo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case bo:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case So:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Mo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Eo:case To:case Ao:return Math.ceil(i/4)*Math.ceil(e/4)*16;case wo:case Ro:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ur:case Co:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function mf(i){switch(i){case sn:case nu:return{byteLength:1,components:1};case Ds:case iu:case jt:return{byteLength:2,components:1};case qo:case Wo:return{byteLength:2,components:4};case Pn:case Vo:case Cn:return{byteLength:4,components:1};case su:case ru:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Fo}}));typeof window<"u"&&(window.__THREE__?De("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Fo);function Pu(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function gf(i){const e=new WeakMap;function t(o,c){const l=o.array,d=o.usage,f=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,d),o.onUploadCallback();let h;if(l instanceof Float32Array)h=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)h=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?h=i.HALF_FLOAT:h=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)h=i.SHORT;else if(l instanceof Uint32Array)h=i.UNSIGNED_INT;else if(l instanceof Int32Array)h=i.INT;else if(l instanceof Int8Array)h=i.BYTE;else if(l instanceof Uint8Array)h=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)h=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:h,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,c,l){const d=c.array,f=c.updateRanges;if(i.bindBuffer(l,o),f.length===0)i.bufferSubData(l,0,d);else{f.sort((h,m)=>h.start-m.start);let u=0;for(let h=1;h<f.length;h++){const m=f[u],_=f[h];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++u,f[u]=_)}f.length=u+1;for(let h=0,m=f.length;h<m;h++){const _=f[h];i.bufferSubData(l,_.start*d.BYTES_PER_ELEMENT,d,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var vf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,_f=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,xf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,yf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Sf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Mf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ef=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Tf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Af=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,wf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Rf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Cf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Lf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Pf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Df=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,If=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Nf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Uf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ff=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Of=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Bf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,zf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,kf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Hf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Gf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Vf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Wf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Xf="gl_FragColor = linearToOutputTexel( gl_FragColor );",$f=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Yf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Kf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Zf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Jf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Qf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,jf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ep=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,tp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,np=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ip=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,sp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,rp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ap=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,op=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,cp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,up=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,dp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,fp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,pp=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,mp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,gp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,vp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_p=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,xp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,yp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Mp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ep=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Tp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ap=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Rp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Cp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Lp=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Pp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Ip=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Np=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Up=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Fp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Op=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,zp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,kp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Hp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Gp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,qp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Wp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Xp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$p=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Yp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Kp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Zp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Jp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,jp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,em=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,tm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,nm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,im=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,sm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,rm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,am=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,om=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,lm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,um=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,dm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,hm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,fm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,pm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,mm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const gm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,vm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_m=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xm=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ym=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Mm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Em=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Tm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Am=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,wm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Cm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Lm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Pm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Im=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Nm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Um=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Om=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Bm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,km=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Hm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Wm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Xm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$m=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ym=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Km=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ge={alphahash_fragment:vf,alphahash_pars_fragment:_f,alphamap_fragment:xf,alphamap_pars_fragment:yf,alphatest_fragment:bf,alphatest_pars_fragment:Sf,aomap_fragment:Mf,aomap_pars_fragment:Ef,batching_pars_vertex:Tf,batching_vertex:Af,begin_vertex:wf,beginnormal_vertex:Rf,bsdfs:Cf,iridescence_fragment:Lf,bumpmap_pars_fragment:Pf,clipping_planes_fragment:Df,clipping_planes_pars_fragment:If,clipping_planes_pars_vertex:Nf,clipping_planes_vertex:Uf,color_fragment:Ff,color_pars_fragment:Of,color_pars_vertex:Bf,color_vertex:zf,common:kf,defaultnormal_vertex:Hf,displacementmap_pars_vertex:Gf,displacementmap_vertex:Vf,emissivemap_fragment:qf,emissivemap_pars_fragment:Wf,colorspace_fragment:Xf,colorspace_pars_fragment:$f,envmap_fragment:Yf,envmap_common_pars_fragment:Kf,envmap_pars_fragment:Zf,envmap_pars_vertex:Jf,envmap_physical_pars_fragment:lp,envmap_vertex:Qf,fog_vertex:jf,fog_pars_vertex:ep,fog_fragment:tp,fog_pars_fragment:np,gradientmap_pars_fragment:ip,lightmap_pars_fragment:sp,lights_lambert_fragment:rp,lights_lambert_pars_fragment:ap,lights_pars_begin:op,lights_toon_fragment:cp,lights_toon_pars_fragment:up,lights_phong_fragment:dp,lights_phong_pars_fragment:hp,lights_physical_fragment:fp,lights_physical_pars_fragment:pp,lights_fragment_begin:mp,lights_fragment_maps:gp,lights_fragment_end:vp,lightprobes_pars_fragment:_p,logdepthbuf_fragment:xp,logdepthbuf_pars_fragment:yp,logdepthbuf_pars_vertex:bp,logdepthbuf_vertex:Sp,map_fragment:Mp,map_pars_fragment:Ep,map_particle_fragment:Tp,map_particle_pars_fragment:Ap,metalnessmap_fragment:wp,metalnessmap_pars_fragment:Rp,morphinstance_vertex:Cp,morphcolor_vertex:Lp,morphnormal_vertex:Pp,morphtarget_pars_vertex:Dp,morphtarget_vertex:Ip,normal_fragment_begin:Np,normal_fragment_maps:Up,normal_pars_fragment:Fp,normal_pars_vertex:Op,normal_vertex:Bp,normalmap_pars_fragment:zp,clearcoat_normal_fragment_begin:kp,clearcoat_normal_fragment_maps:Hp,clearcoat_pars_fragment:Gp,iridescence_pars_fragment:Vp,opaque_fragment:qp,packing:Wp,premultiplied_alpha_fragment:Xp,project_vertex:$p,dithering_fragment:Yp,dithering_pars_fragment:Kp,roughnessmap_fragment:Zp,roughnessmap_pars_fragment:Jp,shadowmap_pars_fragment:Qp,shadowmap_pars_vertex:jp,shadowmap_vertex:em,shadowmask_pars_fragment:tm,skinbase_vertex:nm,skinning_pars_vertex:im,skinning_vertex:sm,skinnormal_vertex:rm,specularmap_fragment:am,specularmap_pars_fragment:om,tonemapping_fragment:lm,tonemapping_pars_fragment:cm,transmission_fragment:um,transmission_pars_fragment:dm,uv_pars_fragment:hm,uv_pars_vertex:fm,uv_vertex:pm,worldpos_vertex:mm,background_vert:gm,background_frag:vm,backgroundCube_vert:_m,backgroundCube_frag:xm,cube_vert:ym,cube_frag:bm,depth_vert:Sm,depth_frag:Mm,distance_vert:Em,distance_frag:Tm,equirect_vert:Am,equirect_frag:wm,linedashed_vert:Rm,linedashed_frag:Cm,meshbasic_vert:Lm,meshbasic_frag:Pm,meshlambert_vert:Dm,meshlambert_frag:Im,meshmatcap_vert:Nm,meshmatcap_frag:Um,meshnormal_vert:Fm,meshnormal_frag:Om,meshphong_vert:Bm,meshphong_frag:zm,meshphysical_vert:km,meshphysical_frag:Hm,meshtoon_vert:Gm,meshtoon_frag:Vm,points_vert:qm,points_frag:Wm,shadow_vert:Xm,shadow_frag:$m,sprite_vert:Ym,sprite_frag:Km},me={common:{diffuse:{value:new Ae(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ue}},envmap:{envMap:{value:null},envMapRotation:{value:new Ue},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ue},normalScale:{value:new re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ae(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Ae(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0},uvTransform:{value:new Ue}},sprite:{diffuse:{value:new Ae(16777215)},opacity:{value:1},center:{value:new re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}}},Rn={basic:{uniforms:Ht([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:Ht([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Ae(0)},envMapIntensity:{value:1}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:Ht([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Ae(0)},specular:{value:new Ae(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:Ht([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new Ae(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:Ht([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new Ae(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:Ht([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:Ht([me.points,me.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:Ht([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:Ht([me.common,me.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:Ht([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:Ht([me.sprite,me.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ue}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distance:{uniforms:Ht([me.common,me.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distance_vert,fragmentShader:Ge.distance_frag},shadow:{uniforms:Ht([me.lights,me.fog,{color:{value:new Ae(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};Rn.physical={uniforms:Ht([Rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ue},clearcoatNormalScale:{value:new re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ue},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Ue},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ue},sheen:{value:0},sheenColor:{value:new Ae(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ue},transmissionSamplerSize:{value:new re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ue},attenuationDistance:{value:0},attenuationColor:{value:new Ae(0)},specularColor:{value:new Ae(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ue},anisotropyVector:{value:new re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ue}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const _r={r:0,b:0,g:0},Zm=new it,Du=new Ue;Du.set(-1,0,0,0,1,0,0,0,1);function Jm(i,e,t,n,s,r){const a=new Ae(0);let o=s===!0?0:1,c,l,d=null,f=0,u=null;function h(y){let E=y.isScene===!0?y.background:null;if(E&&E.isTexture){const S=y.backgroundBlurriness>0;E=e.get(E,S)}return E}function m(y){let E=!1;const S=h(y);S===null?g(a,o):S&&S.isColor&&(g(S,1),E=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?t.buffers.color.setClear(0,0,0,1,r):R==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(y,E){const S=h(E);S&&S.isCubeTexture?(l===void 0&&(l=new We(new rs(1,1,1),new Qt({name:"BackgroundCubeMaterial",uniforms:ns(Rn.backgroundCube.uniforms),vertexShader:Rn.backgroundCube.vertexShader,fragmentShader:Rn.backgroundCube.fragmentShader,side:Wt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(R,A,v){this.matrixWorld.copyPosition(v.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=S,l.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Zm.makeRotationFromEuler(E.backgroundRotation)).transpose(),S.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Du),l.material.toneMapped=Ze.getTransfer(S.colorSpace)!==nt,(d!==S||f!==S.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,d=S,f=S.version,u=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new We(new ks(2,2),new Qt({name:"BackgroundMaterial",uniforms:ns(Rn.background.uniforms),vertexShader:Rn.background.vertexShader,fragmentShader:Rn.background.fragmentShader,side:Mi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=Ze.getTransfer(S.colorSpace)!==nt,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(d!==S||f!==S.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,d=S,f=S.version,u=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function g(y,E){y.getRGB(_r,wu(i)),t.buffers.color.setClear(_r.r,_r.g,_r.b,E,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,E=1){a.set(y),o=E,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,g(a,o)},render:m,addToRenderList:_,dispose:p}}function Qm(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function o(U,O,q,D,V){let J=!1;const H=f(U,D,q,O);r!==H&&(r=H,l(r.object)),J=h(U,D,q,V),J&&m(U,D,q,V),V!==null&&e.update(V,i.ELEMENT_ARRAY_BUFFER),(J||a)&&(a=!1,S(U,O,q,D),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function c(){return i.createVertexArray()}function l(U){return i.bindVertexArray(U)}function d(U){return i.deleteVertexArray(U)}function f(U,O,q,D){const V=D.wireframe===!0;let J=n[O.id];J===void 0&&(J={},n[O.id]=J);const H=U.isInstancedMesh===!0?U.id:0;let ne=J[H];ne===void 0&&(ne={},J[H]=ne);let X=ne[q.id];X===void 0&&(X={},ne[q.id]=X);let j=X[V];return j===void 0&&(j=u(c()),X[V]=j),j}function u(U){const O=[],q=[],D=[];for(let V=0;V<t;V++)O[V]=0,q[V]=0,D[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:q,attributeDivisors:D,object:U,attributes:{},index:null}}function h(U,O,q,D){const V=r.attributes,J=O.attributes;let H=0;const ne=q.getAttributes();for(const X in ne)if(ne[X].location>=0){const ee=V[X];let Ee=J[X];if(Ee===void 0&&(X==="instanceMatrix"&&U.instanceMatrix&&(Ee=U.instanceMatrix),X==="instanceColor"&&U.instanceColor&&(Ee=U.instanceColor)),ee===void 0||ee.attribute!==Ee||Ee&&ee.data!==Ee.data)return!0;H++}return r.attributesNum!==H||r.index!==D}function m(U,O,q,D){const V={},J=O.attributes;let H=0;const ne=q.getAttributes();for(const X in ne)if(ne[X].location>=0){let ee=J[X];ee===void 0&&(X==="instanceMatrix"&&U.instanceMatrix&&(ee=U.instanceMatrix),X==="instanceColor"&&U.instanceColor&&(ee=U.instanceColor));const Ee={};Ee.attribute=ee,ee&&ee.data&&(Ee.data=ee.data),V[X]=Ee,H++}r.attributes=V,r.attributesNum=H,r.index=D}function _(){const U=r.newAttributes;for(let O=0,q=U.length;O<q;O++)U[O]=0}function g(U){p(U,0)}function p(U,O){const q=r.newAttributes,D=r.enabledAttributes,V=r.attributeDivisors;q[U]=1,D[U]===0&&(i.enableVertexAttribArray(U),D[U]=1),V[U]!==O&&(i.vertexAttribDivisor(U,O),V[U]=O)}function y(){const U=r.newAttributes,O=r.enabledAttributes;for(let q=0,D=O.length;q<D;q++)O[q]!==U[q]&&(i.disableVertexAttribArray(q),O[q]=0)}function E(U,O,q,D,V,J,H){H===!0?i.vertexAttribIPointer(U,O,q,V,J):i.vertexAttribPointer(U,O,q,D,V,J)}function S(U,O,q,D){_();const V=D.attributes,J=q.getAttributes(),H=O.defaultAttributeValues;for(const ne in J){const X=J[ne];if(X.location>=0){let j=V[ne];if(j===void 0&&(ne==="instanceMatrix"&&U.instanceMatrix&&(j=U.instanceMatrix),ne==="instanceColor"&&U.instanceColor&&(j=U.instanceColor)),j!==void 0){const ee=j.normalized,Ee=j.itemSize,Fe=e.get(j);if(Fe===void 0)continue;const K=Fe.buffer,ge=Fe.type,be=Fe.bytesPerElement,Le=ge===i.INT||ge===i.UNSIGNED_INT||j.gpuType===Vo;if(j.isInterleavedBufferAttribute){const ve=j.data,Be=ve.isInterleavedBuffer===!0?ve.stride:ve.itemSize,gt=j.offset;if(ve.isInstancedInterleavedBuffer||ve.isInstancedBufferAttribute){for(let Ie=0;Ie<X.locationSize;Ie++)p(X.location+Ie,ve.meshPerAttribute);U.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=ve.meshPerAttribute*ve.count)}else for(let Ie=0;Ie<X.locationSize;Ie++)g(X.location+Ie);i.bindBuffer(i.ARRAY_BUFFER,K);for(let Ie=0;Ie<X.locationSize;Ie++)E(X.location+Ie,Ee/X.locationSize,ge,ee,Be*be,(gt+Ee/X.locationSize*Ie)*be,Le)}else{if(j.isInstancedBufferAttribute){for(let ve=0;ve<X.locationSize;ve++)p(X.location+ve,j.meshPerAttribute);U.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let ve=0;ve<X.locationSize;ve++)g(X.location+ve);i.bindBuffer(i.ARRAY_BUFFER,K);for(let ve=0;ve<X.locationSize;ve++)E(X.location+ve,Ee/X.locationSize,ge,ee,Ee*be,Ee/X.locationSize*ve*be,Le)}}else if(H!==void 0){const ee=H[ne];if(ee!==void 0)switch(ee.length){case 2:i.vertexAttrib2fv(X.location,ee);break;case 3:i.vertexAttrib3fv(X.location,ee);break;case 4:i.vertexAttrib4fv(X.location,ee);break;default:i.vertexAttrib1fv(X.location,ee)}}}}y()}function R(){I();for(const U in n){const O=n[U];for(const q in O){const D=O[q];for(const V in D){const J=D[V];for(const H in J)d(J[H].object),delete J[H];delete D[V]}}delete n[U]}}function A(U){if(n[U.id]===void 0)return;const O=n[U.id];for(const q in O){const D=O[q];for(const V in D){const J=D[V];for(const H in J)d(J[H].object),delete J[H];delete D[V]}}delete n[U.id]}function v(U){for(const O in n){const q=n[O];for(const D in q){const V=q[D];if(V[U.id]===void 0)continue;const J=V[U.id];for(const H in J)d(J[H].object),delete J[H];delete V[U.id]}}}function M(U){for(const O in n){const q=n[O],D=U.isInstancedMesh===!0?U.id:0,V=q[D];if(V!==void 0){for(const J in V){const H=V[J];for(const ne in H)d(H[ne].object),delete H[ne];delete V[J]}delete q[D],Object.keys(q).length===0&&delete n[O]}}}function I(){L(),a=!0,r!==s&&(r=s,l(r.object))}function L(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:I,resetDefaultState:L,dispose:R,releaseStatesOfGeometry:A,releaseStatesOfObject:M,releaseStatesOfProgram:v,initAttributes:_,enableAttribute:g,disableUnusedAttributes:y}}function jm(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,d){d!==0&&(i.drawArraysInstanced(n,c,l,d),t.update(l,n,d))}function o(c,l,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,d);let u=0;for(let h=0;h<d;h++)u+=l[h];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function e0(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const v=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(v.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(v){return!(v!==Ln&&n.convert(v)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(v){const M=v===jt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(v!==sn&&v!==Cn&&!M&&n.convert(v)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(v){if(v==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";v="mediump"}return v==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const d=c(l);d!==l&&(De("WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);const f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),u=t.logarithmicDepthBuffer===!0&&f===!1;t.reversedDepthBuffer===!0&&f===!1&&De("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&f===!0&&De("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=i.getParameter(i.MAX_SAMPLES),A=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:y,maxVaryings:E,maxFragmentUniforms:S,maxSamples:R,samples:A}}function t0(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new wn,o=new Ue,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const h=f.length!==0||u||n!==0||s;return s=u,n=f.length,h},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){t=d(f,u,0)},this.setState=function(f,u,h){const m=f.clippingPlanes,_=f.clipIntersection,g=f.clipShadows,p=i.get(f);if(!s||m===null||m.length===0||r&&!g)r?d(null):l();else{const y=r?0:n,E=y*4;let S=p.clippingState||null;c.value=S,S=d(m,u,E,h);for(let R=0;R!==E;++R)S[R]=t[R];p.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(f,u,h,m){const _=f!==null?f.length:0;let g=null;if(_!==0){if(g=c.value,m!==!0||g===null){const p=h+_*4,y=u.matrixWorldInverse;o.getNormalMatrix(y),(g===null||g.length<p)&&(g=new Float32Array(p));for(let E=0,S=h;E!==_;++E,S+=4)a.copy(f[E]).applyMatrix4(y,o),a.normal.toArray(g,S),g[S+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}class ol extends en{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Su(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new rs(5,5,5),r=new Qt({name:"CubemapFromEquirect",uniforms:ns(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Wt,blending:Si});r.uniforms.tEquirect.value=t;const a=new We(s,r),o=t.minFilter;return t.minFilter===ti&&(t.minFilter=Jt),new Do(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const _c=256,n0=3,i0=20,Iu=256,Nu=16,s0=3,r0=new w,a0=new Ae;class Vr{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Do(1,10,null),this._boxMesh=new We(new rs(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=r0}=r,c=this._renderer;this._setSize(a);const l=this._allocateTarget(),d=this._getSourceTarget(!0);t>0&&(d.texture.mipmapsAutoUpdate=!1);const f=c.autoClear,u=c.autoClearColor,h=c.autoClearDepth,m=c.autoClearStencil,_=e.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,_===null&&(e.background=c.getClearColor(a0));const g=new Do(n,s,d);return g.position.copy(o),g.update(c,e),c.autoClear=f,c.autoClearColor=u,c.autoClearDepth=h,c.autoClearStencil=m,e.background=_,t>0&&(d.texture.mipmapsAutoUpdate=!0,this._blur(l,t)),this._applyPMREM(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=yc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(_c,pu(e))}_fromTexture(e,t){e.mapping===ji||e.mapping===Ps?this._setSize(e.image.length===0?_c:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);const n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){const e=this._cubeSize,t=xc(e,!1,!1),n=Math.log2(e)-n0;for(let s=0;s<=n;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){const t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=xc(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){const s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=e,r.activeMipmapLevel=t;const a=e.width>>t;e.viewport.set(0,0,a,a),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===ji||e.mapping===Ps?(this._cubemapMaterial===null&&(this._cubemapMaterial=bc()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=yc()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=o0(),this._integrationMaterial=l0());const t=this._cubeSize,n=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;const r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/Nu);for(let a=0;a<=n;a++){const o=Vr.lodToRoughness(a,n);if(a>n-s0)r.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{const c=o>0?Math.log2(t)+.5*Math.log2(6/(Iu*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=c,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=c0());const n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,n),s.envMap.value=e.texture,this._renderCube(r,0,n)}}function xc(i,e,t){return new ol(i,{minFilter:ti,generateMipmaps:e,type:jt,colorSpace:Fr,depthBuffer:t})}function Gs(i,e,t){return new Qt({name:i,uniforms:e,vertexShader:Ge.cube_vert,fragmentShader:t,side:Wt,blending:Si,depthTest:!1,depthWrite:!1})}function o0(){return Gs("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Iu}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function l0(){return Gs("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Nu}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function c0(){return Gs("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${i0}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function yc(){return Gs("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function bc(){return Gs("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function u0(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,h=!1){return u==null?null:h?a(u):r(u)}function r(u){if(u&&u.isTexture){const h=u.mapping;if(h===oa||h===la)if(e.has(u)){const m=e.get(u).texture;return o(m,u.mapping)}else{const m=u.image;if(m&&m.height>0){const _=new ol(m.height);return _.fromEquirectangularTexture(i,u),e.set(u,_),u.addEventListener("dispose",l),o(_.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture&&u.isPMREMTexture!==!0){const h=u.mapping,m=h===oa||h===la,_=h===ji||h===Ps;if(m||_){let g=t.get(u);const p=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new Vr(i)),g=m?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{const y=u.image;return m&&y&&y.height>0||_&&y&&c(y)?(n===null&&(n=new Vr(i)),g=m?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",d),g.texture):null}}}return u}function o(u,h){return h===oa?u.mapping=ji:h===la&&(u.mapping=Ps),u}function c(u){let h=0;const m=6;for(let _=0;_<m;_++)u[_]!==void 0&&h++;return h===m}function l(u){const h=u.target;h.removeEventListener("dispose",l);const m=e.get(h);m!==void 0&&(e.delete(h),m.dispose())}function d(u){const h=u.target;h.removeEventListener("dispose",d);const m=t.get(h);m!==void 0&&(t.delete(h),m.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function d0(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Cr("WebGLRenderer: "+n+" extension not supported."),s}}}function h0(i,e,t,n){const s={},r=new WeakMap,a=new FinalizationRegistry(m=>delete s[m]);function o(m){c(m.target)}function c(m){m.index!==null&&e.remove(m.index);for(const g in m.attributes)e.remove(m.attributes[g]);m.removeEventListener("dispose",o),delete s[m.id],a.unregister(m);const _=r.get(m);_&&(e.remove(_),r.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,t.memory.geometries--}function l(m,_){return s[_.id]!==void 0||(_.addEventListener("dispose",o),s[_.id]=new WeakRef(_),a.register(_,_.id,_),t.memory.geometries++),_}function d(m){const _=m.attributes;for(const g in _)e.update(_[g],i.ARRAY_BUFFER)}function f(m){const _=m.index,g=m.attributes.position;let p=0;if(g===void 0)return;const y=_!==null?_.array.length:g.array.length/3-1,E=g.count>=65535?_u:vu,S=new E(Math.ceil(y/3)*6,1),R=S.array;if(_!==null){const v=_.array;p=_.version;for(let M=0,I=0;M<y;M+=3){const L=v[M+0],U=v[M+1],O=v[M+2];R[I++]=L,R[I++]=U,R[I++]=U,R[I++]=O,R[I++]=O,R[I++]=L}}else{p=g.version;for(let v=0,M=0;v<y;v+=3){const I=v+0,L=v+1,U=v+2;R[M++]=I,R[M++]=L,R[M++]=L,R[M++]=U,R[M++]=U,R[M++]=I}}S.version=p;const A=r.get(m);A&&e.remove(A),r.set(m,S)}function u(m){const _=r.get(m);if(_){const g=m.index;g!==null&&_.version<g.version&&f(m)}else f(m);return r.get(m)}function h(){for(const m in s){const _=s[m].deref();_!==void 0&&c(_)}}return{get:l,update:d,getWireframeAttribute:u,dispose:h}}function f0(i,e,t){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,u){i.drawElements(n,u,r,f*a),t.update(u,n,1)}function l(f,u,h){h!==0&&(i.drawElementsInstanced(n,u,r,f*a,h),t.update(u,n,h))}function d(f,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,f,0,h);let _=0;for(let g=0;g<h;g++)_+=u[g];t.update(_,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=d}function p0(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Qe("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function m0(i,e,t){const n=new WeakMap,s=new pt;function r(a,o,c){const l=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=d!==void 0?d.length:0;let u=n.get(o);if(u===void 0||u.count!==f){let L=function(){M.dispose(),n.delete(o),o.removeEventListener("dispose",L)};var h=L;u!==void 0&&u.texture.dispose();const m=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let S=0;m===!0&&(S=1),_===!0&&(S=2),g===!0&&(S=3);let R=o.attributes.position.count*S,A=1;R>e.maxTextureSize&&(A=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const v=new Float32Array(R*A*4*f),M=new mu(v,R,A,f);M.type=Cn,M.needsUpdate=!0;const I=S*4;for(let U=0;U<f;U++){const O=p[U],q=y[U],D=E[U],V=R*A*4*U;for(let J=0;J<O.count;J++){const H=J*I;m===!0&&(s.fromBufferAttribute(O,J),v[V+H+0]=s.x,v[V+H+1]=s.y,v[V+H+2]=s.z,v[V+H+3]=0),_===!0&&(s.fromBufferAttribute(q,J),v[V+H+4]=s.x,v[V+H+5]=s.y,v[V+H+6]=s.z,v[V+H+7]=0),g===!0&&(s.fromBufferAttribute(D,J),v[V+H+8]=s.x,v[V+H+9]=s.y,v[V+H+10]=s.z,v[V+H+11]=D.itemSize===4?s.w:1)}}u={count:f,texture:M,size:new re(R,A)},n.set(o,u),o.addEventListener("dispose",L)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let m=0;for(let g=0;g<l.length;g++)m+=l[g];const _=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function g0(i,e,t,n,s){let r=new WeakMap;function a(l){const d=s.render.frame,f=l.geometry,u=e.get(l,f);if(r.get(u)!==d&&(e.update(u),r.set(u,d)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==d&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,d))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==d&&(h.update(),r.set(h,d))}return u}function o(){r=new WeakMap}function c(l){const d=l.target;d.removeEventListener("dispose",c),n.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}const v0={[Oo]:"LINEAR_TONE_MAPPING",[Bo]:"REINHARD_TONE_MAPPING",[zo]:"CINEON_TONE_MAPPING",[Wr]:"ACES_FILMIC_TONE_MAPPING",[Ho]:"AGX_TONE_MAPPING",[Go]:"NEUTRAL_TONE_MAPPING",[ko]:"CUSTOM_TONE_MAPPING"};function _0(i,e,t,n,s,r){const a=new en(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null,l=null;const d=new dt;d.setAttribute("position",new Xe([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new Xe([0,2,0,0,2,0],2));const f=new Ru({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new We(d,f),h=new al(-1,1,1,-1,0,1);let m=null,_=null,g=!1,p,y=null,E=[],S=!1;this.setSize=function(R,A){a.setSize(R,A),o!==null&&o.setSize(R,A),c!==null&&c.setSize(R,A);for(let v=0;v<E.length;v++){const M=E[v];M.setSize&&M.setSize(R,A)}},this.setEffects=function(R){E=R,S=E.length>0&&E[0].isRenderPass===!0;const A=a.width,v=a.height;E.length>0&&o===null&&(o=new en(A,v,{type:jt,depthBuffer:!1,stencilBuffer:!1}),c=new en(A,v,{type:jt,depthBuffer:!1,stencilBuffer:!1}));const M=s===!0&&E.some(I=>I.needsDepthTexture===!0);M!==(a.depthTexture!==null)&&(M===!0&&l===null&&(l=new ts(A,v),r===!0&&(l.format=ni,l.type=es)),a.dispose(),a.depthTexture=M?l:null,a.resolveDepthBuffer=M,a.storeMultisampledDepthBuffer=M);for(let I=0;I<E.length;I++){const L=E[I];L.setSize&&L.setSize(A,v),M&&L.needsDepthTexture===!0&&L.setDepthTexture&&L.setDepthTexture(l)}},this.begin=function(R,A){if(g||R.toneMapping===Vn&&E.length===0)return!1;if(y=A,A!==null){const v=A.width,M=A.height;(a.width!==v||a.height!==M)&&this.setSize(v,M)}return S===!1&&R.setRenderTarget(a),p=R.toneMapping,R.toneMapping=Vn,!0},this.hasRenderPass=function(){return S},this.end=function(R,A){R.toneMapping=p,g=!0;let v=a,M=o;for(let I=0;I<E.length;I++){const L=E[I];L.enabled!==!1&&(L.render(R,M,v,A),L.needsSwap!==!1&&(v=M,M=M===o?c:o))}if(m!==R.outputColorSpace||_!==R.toneMapping){m=R.outputColorSpace,_=R.toneMapping,f.defines={},Ze.getTransfer(m)===nt&&(f.defines.SRGB_TRANSFER="");const I=v0[_];I&&(f.defines[I]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=v.texture,R.setRenderTarget(y),R.render(u,h),y=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),d.dispose(),f.dispose()}}const Uu=new Bt,Fu=new ts(1,1),Ou=new Mu(1),Bu=new mu,zu=new fh,ku=new Su,Sc=[],Mc=[],Ec=new Float32Array(16),Tc=new Float32Array(9),Ac=new Float32Array(4);function as(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Sc[s];if(r===void 0&&(r=new Float32Array(s),Sc[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function St(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Mt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Zr(i,e){let t=Mc[e];t===void 0&&(t=new Int32Array(e),Mc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function x0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function y0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;i.uniform2fv(this.addr,e),Mt(t,e)}}function b0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(St(t,e))return;i.uniform3fv(this.addr,e),Mt(t,e)}}function S0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;i.uniform4fv(this.addr,e),Mt(t,e)}}function M0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Mt(t,e)}else{if(St(t,n))return;Ac.set(n),i.uniformMatrix2fv(this.addr,!1,Ac),Mt(t,n)}}function E0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Mt(t,e)}else{if(St(t,n))return;Tc.set(n),i.uniformMatrix3fv(this.addr,!1,Tc),Mt(t,n)}}function T0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Mt(t,e)}else{if(St(t,n))return;Ec.set(n),i.uniformMatrix4fv(this.addr,!1,Ec),Mt(t,n)}}function A0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function w0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;i.uniform2iv(this.addr,e),Mt(t,e)}}function R0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;i.uniform3iv(this.addr,e),Mt(t,e)}}function C0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;i.uniform4iv(this.addr,e),Mt(t,e)}}function L0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function P0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;i.uniform2uiv(this.addr,e),Mt(t,e)}}function D0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;i.uniform3uiv(this.addr,e),Mt(t,e)}}function I0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;i.uniform4uiv(this.addr,e),Mt(t,e)}}function Jr(i){return i.version===0&&(i.compareFunction=du,i.needsUpdate=!0),i}function N0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=Jr(Fu):r=Uu,t.setTexture2D(e||r,s)}function U0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||zu,s)}function F0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=Jr(Ou):r=ku,t.setTextureCube(e||r,s)}function O0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Bu,s)}function B0(i){switch(i){case 5126:return x0;case 35664:return y0;case 35665:return b0;case 35666:return S0;case 35674:return M0;case 35675:return E0;case 35676:return T0;case 5124:case 35670:return A0;case 35667:case 35671:return w0;case 35668:case 35672:return R0;case 35669:case 35673:return C0;case 5125:return L0;case 36294:return P0;case 36295:return D0;case 36296:return I0;case 35678:case 36198:case 36298:case 36306:case 35682:return N0;case 35679:case 36299:case 36307:return U0;case 35680:case 36300:case 36308:case 36293:return F0;case 36289:case 36303:case 36311:case 36292:return O0}}function z0(i,e){i.uniform1fv(this.addr,e)}function k0(i,e){const t=as(e,this.size,2);i.uniform2fv(this.addr,t)}function H0(i,e){const t=as(e,this.size,3);i.uniform3fv(this.addr,t)}function G0(i,e){const t=as(e,this.size,4);i.uniform4fv(this.addr,t)}function V0(i,e){const t=as(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function q0(i,e){const t=as(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function W0(i,e){const t=as(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function X0(i,e){i.uniform1iv(this.addr,e)}function $0(i,e){i.uniform2iv(this.addr,e)}function Y0(i,e){i.uniform3iv(this.addr,e)}function K0(i,e){i.uniform4iv(this.addr,e)}function Z0(i,e){i.uniform1uiv(this.addr,e)}function J0(i,e){i.uniform2uiv(this.addr,e)}function Q0(i,e){i.uniform3uiv(this.addr,e)}function j0(i,e){i.uniform4uiv(this.addr,e)}function eg(i,e,t){const n=this.cache,s=e.length,r=Zr(t,s);St(n,r)||(i.uniform1iv(this.addr,r),Mt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Jr(Fu):a=Uu;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function tg(i,e,t){const n=this.cache,s=e.length,r=Zr(t,s);St(n,r)||(i.uniform1iv(this.addr,r),Mt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||zu,r[a])}function ng(i,e,t){const n=this.cache,s=e.length,r=Zr(t,s);St(n,r)||(i.uniform1iv(this.addr,r),Mt(n,r));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=Jr(Ou):a=ku;for(let o=0;o!==s;++o)t.setTextureCube(e[o]||a,r[o])}function ig(i,e,t){const n=this.cache,s=e.length,r=Zr(t,s);St(n,r)||(i.uniform1iv(this.addr,r),Mt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Bu,r[a])}function sg(i){switch(i){case 5126:return z0;case 35664:return k0;case 35665:return H0;case 35666:return G0;case 35674:return V0;case 35675:return q0;case 35676:return W0;case 5124:case 35670:return X0;case 35667:case 35671:return $0;case 35668:case 35672:return Y0;case 35669:case 35673:return K0;case 5125:return Z0;case 36294:return J0;case 36295:return Q0;case 36296:return j0;case 35678:case 36198:case 36298:case 36306:case 35682:return eg;case 35679:case 36299:case 36307:return tg;case 35680:case 36300:case 36308:case 36293:return ng;case 36289:case 36303:case 36311:case 36292:return ig}}class rg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=B0(t.type)}}class ag{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=sg(t.type)}}class og{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const za=/(\w+)(\])?(\[|\.)?/g;function wc(i,e){i.seq.push(e),i.map[e.id]=e}function lg(i,e,t){const n=i.name,s=n.length;for(za.lastIndex=0;;){const r=za.exec(n),a=za.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){wc(t,l===void 0?new rg(o,i,e):new ag(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new og(o),wc(t,f)),t=f}}}class Pr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);lg(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Rc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const cg=37297;let ug=0;function dg(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Cc=new Ue;function hg(i){Ze._getMatrix(Cc,Ze.workingColorSpace,i);const e=`mat3( ${Cc.elements.map(t=>t.toFixed(4))} )`;switch(Ze.getTransfer(i)){case Or:return[e,"LinearTransferOETF"];case nt:return[e,"sRGBTransferOETF"];default:return De("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Lc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+dg(i.getShaderSource(e),o)}else return r}function fg(i,e){const t=hg(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const pg={[Oo]:"Linear",[Bo]:"Reinhard",[zo]:"Cineon",[Wr]:"ACESFilmic",[Ho]:"AgX",[Go]:"Neutral",[ko]:"Custom"};function mg(i,e){const t=pg[e];return t===void 0?(De("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const xr=new w;function gg(){Ze.getLuminanceCoefficients(xr);const i=xr.x.toFixed(4),e=xr.y.toFixed(4),t=xr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function vg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ss).join(`
`)}function _g(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function xg(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Ss(i){return i!==""}function Pc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function Dc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const yg=/^[ \t]*#include +<([\w\d./]+)>/gm;function No(i){return i.replace(yg,bg)}function bg(i,e){const t=Ge[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return No(t)}const Sg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ic(i){return i.replace(Sg,Mg)}function Mg(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Nc(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Eg={[Er]:"SHADOWMAP_TYPE_PCF",[bs]:"SHADOWMAP_TYPE_VSM"};function Tg(i){return Eg[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Ag={[Ps]:"ENVMAP_MODE_REFRACTION"};function wg(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Ag[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Rg={[eu]:"ENVMAP_BLENDING_MULTIPLY",[Dd]:"ENVMAP_BLENDING_MIX",[Id]:"ENVMAP_BLENDING_ADD"};function Cg(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Rg[i.combine]||"ENVMAP_BLENDING_NONE"}function Lg(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Tg(t),l=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",d=wg(t),f=Cg(t),u=vg(t),h=_g(r),m=s.createProgram();let _,g,p=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h].filter(Ss).join(`
`),_.length>0&&(_+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h].filter(Ss).join(`
`),g.length>0&&(g+=`
`)):(_=[Nc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ss).join(`
`),g=[Nc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+d:"",t.envMap?"#define "+f:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Vn?"#define TONE_MAPPING":"",t.toneMapping!==Vn?Ge.tonemapping_pars_fragment:"",t.toneMapping!==Vn?mg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,fg("linearToOutputTexel",t.outputColorSpace),gg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ss).join(`
`)),a=No(a),a=Pc(a,t),a=Dc(a,t),o=No(o),o=Pc(o,t),o=Dc(o,t),a=Ic(a),o=Ic(o),t.isRawShaderMaterial!==!0&&(p=`#version 300 es
`,_=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,g=["#define varying in",t.glslVersion===Il?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Il?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const y=p+_+a,E=p+g+o,S=Rc(s,s.VERTEX_SHADER,y),R=Rc(s,s.FRAGMENT_SHADER,E);s.attachShader(m,S),s.attachShader(m,R),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function A(L){if(i.debug.checkShaderErrors){const U=s.getProgramInfoLog(m)||"",O=s.getShaderInfoLog(S)||"",q=s.getShaderInfoLog(R)||"",D=U.trim(),V=O.trim(),J=q.trim();let H=!0,ne=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(H=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,m,S,R);else{const X=Lc(s,S,"vertex"),j=Lc(s,R,"fragment");Qe("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+D+`
`+X+`
`+j)}else D!==""?De("WebGLProgram: Program Info Log:",D):(V===""||J==="")&&(ne=!1);ne&&(L.diagnostics={runnable:H,programLog:D,vertexShader:{log:V,prefix:_},fragmentShader:{log:J,prefix:g}})}s.deleteShader(S),s.deleteShader(R),v=new Pr(s,m),M=xg(s,m)}let v;this.getUniforms=function(){return v===void 0&&A(this),v};let M;this.getAttributes=function(){return M===void 0&&A(this),M};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(m,cg)),I},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ug++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=S,this.fragmentShader=R,this}let Pg=0;class Dg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Ig(e),t.set(e,n)),n}}class Ig{constructor(e){this.id=Pg++,this.code=e,this.usedTimes=0}}function Ng(i){return i===Ei||i===Nr||i===Ur}function Ug(i,e,t,n,s,r){const a=new el,o=new Dg,c=new Set,l=[],d=new Map,f=n.logarithmicDepthBuffer,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function h(v){return c.add(v),v===0?"uv":`uv${v}`}function m(v,M,I,L,U,O){const q=L.fog,D=U.geometry,V=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?L.environment:null,J=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,H=e.get(v.envMap||V,J),ne=u[v.type];let X=n.precision;v.precision!==null&&(X=n.getMaxPrecision(v.precision),X!==v.precision&&De("WebGLProgram.getParameters:",v.precision,"not supported, using",X,"instead."));const j=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,ee=j!==void 0?j.length:0;let Ee=0;D.morphAttributes.position!==void 0&&(Ee=1),D.morphAttributes.normal!==void 0&&(Ee=2),D.morphAttributes.color!==void 0&&(Ee=3);let Fe,K,ge,be;if(ne){const pe=Rn[ne];Fe=pe.vertexShader,K=pe.fragmentShader}else{Fe=v.vertexShader,K=v.fragmentShader;const pe=o.getVertexShaderStage(v),rt=o.getFragmentShaderStage(v);o.update(v,pe,rt),ge=pe.id,be=rt.id}const Le=i.getRenderTarget(),ve=i.state.buffers.depth.getReversed(),Be=U.isInstancedMesh===!0,gt=U.isBatchedMesh===!0,Ie=!!v.map,st=!!v.matcap,at=!!H,$e=at&&H.isPMREMTexture===!0,Rt=!!v.aoMap,xt=!!v.lightMap,Xt=!!v.bumpMap&&v.wireframe===!1,ht=!!v.normalMap,En=!!v.displacementMap,Et=!!v.emissiveMap,on=!!v.metalnessMap,ln=!!v.roughnessMap,cn=v.anisotropy>0,F=v.clearcoat>0,un=v.diffuseRoughness>0,ct=v.dispersion>0,ut=v.retroreflectivity>0,fe=v.iridescence>0,yt=v.sheen>0,Pe=v.transmission>0,Ne=cn&&!!v.anisotropyMap,T=F&&!!v.clearcoatMap,x=F&&!!v.clearcoatNormalMap,z=F&&!!v.clearcoatRoughnessMap,te=un&&!!v.diffuseRoughnessMap,Q=fe&&!!v.iridescenceMap,ae=fe&&!!v.iridescenceThicknessMap,de=yt&&!!v.sheenColorMap,$=yt&&!!v.sheenRoughnessMap,Y=!!v.specularMap,le=!!v.specularColorMap,C=!!v.specularIntensityMap,Z=Pe&&!!v.transmissionMap,W=Pe&&!!v.thicknessMap,ce=!!v.gradientMap,se=!!v.alphaMap,oe=v.alphaTest>0,we=!!v.alphaHash,He=!!v.extensions;let ie=Vn;v.toneMapped&&(Le===null||Le.isXRRenderTarget===!0)&&(ie=i.toneMapping);const Re=$e?H.isCompressedCubeTexture?H.image[0].mipmaps:H.mipmaps:null,ze={shaderID:ne,shaderType:v.type,shaderName:v.name,vertexShader:Fe,fragmentShader:K,defines:v.defines,customVertexShaderID:ge,customFragmentShaderID:be,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:X,batching:gt,batchingColor:gt&&U._colorsTexture!==null,instancing:Be,instancingColor:Be&&U.instanceColor!==null,instancingMorph:Be&&U.morphTexture!==null,outputColorSpace:Le===null?i.outputColorSpace:Le.isXRRenderTarget===!0?Le.texture.colorSpace:Ze.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:Ie,matcap:st,envMap:at,envMapMode:at&&H.mapping,envMapPMREM:$e,envMapMaxLod:$e?Re.length-1:null,envMapSize:$e?Re[0].width:null,aoMap:Rt,lightMap:xt,bumpMap:Xt,normalMap:ht,displacementMap:En,emissiveMap:Et,normalMapObjectSpace:ht&&v.normalMapType===Fd,normalMapTangentSpace:ht&&v.normalMapType===Lo,packedNormalMap:ht&&v.normalMapType===Lo&&Ng(v.normalMap.format),metalnessMap:on,roughnessMap:ln,anisotropy:cn,anisotropyMap:Ne,clearcoat:F,clearcoatMap:T,clearcoatNormalMap:x,clearcoatRoughnessMap:z,diffuseRoughness:un,diffuseRoughnessMap:te,dispersion:ct,retroreflection:ut,iridescence:fe,iridescenceMap:Q,iridescenceThicknessMap:ae,sheen:yt,sheenColorMap:de,sheenRoughnessMap:$,specularMap:Y,specularColorMap:le,specularIntensityMap:C,transmission:Pe,transmissionMap:Z,thicknessMap:W,gradientMap:ce,opaque:v.transparent===!1&&v.blending===Es&&v.alphaToCoverage===!1,alphaMap:se,alphaTest:oe,alphaHash:we,combine:v.combine,mapUv:Ie&&h(v.map.channel),aoMapUv:Rt&&h(v.aoMap.channel),lightMapUv:xt&&h(v.lightMap.channel),bumpMapUv:Xt&&h(v.bumpMap.channel),normalMapUv:ht&&h(v.normalMap.channel),displacementMapUv:En&&h(v.displacementMap.channel),emissiveMapUv:Et&&h(v.emissiveMap.channel),metalnessMapUv:on&&h(v.metalnessMap.channel),roughnessMapUv:ln&&h(v.roughnessMap.channel),anisotropyMapUv:Ne&&h(v.anisotropyMap.channel),clearcoatMapUv:T&&h(v.clearcoatMap.channel),clearcoatNormalMapUv:x&&h(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:z&&h(v.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:te&&h(v.diffuseRoughnessMap.channel),iridescenceMapUv:Q&&h(v.iridescenceMap.channel),iridescenceThicknessMapUv:ae&&h(v.iridescenceThicknessMap.channel),sheenColorMapUv:de&&h(v.sheenColorMap.channel),sheenRoughnessMapUv:$&&h(v.sheenRoughnessMap.channel),specularMapUv:Y&&h(v.specularMap.channel),specularColorMapUv:le&&h(v.specularColorMap.channel),specularIntensityMapUv:C&&h(v.specularIntensityMap.channel),transmissionMapUv:Z&&h(v.transmissionMap.channel),thicknessMapUv:W&&h(v.thicknessMap.channel),alphaMapUv:se&&h(v.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(ht||cn),vertexNormals:!!D.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!D.attributes.uv&&(Ie||se),fog:!!q,useFog:v.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||D.attributes.normal===void 0&&ht===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ve,skinning:U.isSkinnedMesh===!0,hasPositionAttribute:D.attributes.position!==void 0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:Ee,numSunLights:M.sun.length,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numSunLightShadows:M.sunShadowMap.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:O.filter(pe=>pe.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:ie,decodeVideoTexture:Ie&&v.map.isVideoTexture===!0&&Ze.getTransfer(v.map.colorSpace)===nt,decodeVideoTextureEmissive:Et&&v.emissiveMap.isVideoTexture===!0&&Ze.getTransfer(v.emissiveMap.colorSpace)===nt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Zt,flipSided:v.side===Wt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:He&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(He&&v.extensions.multiDraw===!0||gt)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return ze.vertexUv1s=c.has(1),ze.vertexUv2s=c.has(2),ze.vertexUv3s=c.has(3),c.clear(),ze}function _(v){const M=[];if(v.shaderID?M.push(v.shaderID):(M.push(v.customVertexShaderID),M.push(v.customFragmentShaderID)),v.defines!==void 0)for(const I in v.defines)M.push(I),M.push(v.defines[I]);return v.isRawShaderMaterial===!1&&(g(M,v),p(M,v),M.push(i.outputColorSpace)),M.push(v.customProgramCacheKey),M.join()}function g(v,M){v.push(M.precision),v.push(M.outputColorSpace),v.push(M.envMapMode),v.push(M.envMapPMREM),v.push(M.envMapMaxLod),v.push(M.envMapSize),v.push(M.mapUv),v.push(M.alphaMapUv),v.push(M.lightMapUv),v.push(M.aoMapUv),v.push(M.bumpMapUv),v.push(M.normalMapUv),v.push(M.displacementMapUv),v.push(M.emissiveMapUv),v.push(M.metalnessMapUv),v.push(M.roughnessMapUv),v.push(M.anisotropyMapUv),v.push(M.clearcoatMapUv),v.push(M.clearcoatNormalMapUv),v.push(M.clearcoatRoughnessMapUv),v.push(M.diffuseRoughnessMapUv),v.push(M.iridescenceMapUv),v.push(M.iridescenceThicknessMapUv),v.push(M.sheenColorMapUv),v.push(M.sheenRoughnessMapUv),v.push(M.specularMapUv),v.push(M.specularColorMapUv),v.push(M.specularIntensityMapUv),v.push(M.transmissionMapUv),v.push(M.thicknessMapUv),v.push(M.combine),v.push(M.fogExp2),v.push(M.sizeAttenuation),v.push(M.morphTargetsCount),v.push(M.numSunLights),v.push(M.numDirLights),v.push(M.numPointLights),v.push(M.numSpotLights),v.push(M.numSpotLightMaps),v.push(M.numHemiLights),v.push(M.numRectAreaLights),v.push(M.numSunLightShadows),v.push(M.numDirLightShadows),v.push(M.numPointLightShadows),v.push(M.numSpotLightShadows),v.push(M.numSpotLightShadowsWithMaps),v.push(M.numLightProbes),v.push(M.numLightProbeGrids),v.push(M.shadowMapType),v.push(M.toneMapping),v.push(M.numClippingPlanes),v.push(M.numClipIntersection),v.push(M.depthPacking)}function p(v,M){a.disableAll(),M.instancing&&a.enable(0),M.instancingColor&&a.enable(1),M.instancingMorph&&a.enable(2),M.matcap&&a.enable(3),M.envMap&&a.enable(4),M.normalMapObjectSpace&&a.enable(5),M.normalMapTangentSpace&&a.enable(6),M.clearcoat&&a.enable(7),M.iridescence&&a.enable(8),M.alphaTest&&a.enable(9),M.vertexColors&&a.enable(10),M.vertexAlphas&&a.enable(11),M.vertexUv1s&&a.enable(12),M.vertexUv2s&&a.enable(13),M.vertexUv3s&&a.enable(14),M.vertexTangents&&a.enable(15),M.anisotropy&&a.enable(16),M.alphaHash&&a.enable(17),M.batching&&a.enable(18),M.dispersion&&a.enable(19),M.retroreflection&&a.enable(24),M.diffuseRoughness&&a.enable(25),M.batchingColor&&a.enable(20),M.gradientMap&&a.enable(21),M.packedNormalMap&&a.enable(22),M.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),M.numLightProbeGrids>0&&a.enable(22),M.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function y(v){const M=u[v.type];let I;if(M){const L=Rn[M];I=Os.clone(L.uniforms)}else I=v.uniforms;return I}function E(v,M){let I=d.get(M);return I!==void 0?++I.usedTimes:(I=new Lg(i,M,v,s),l.push(I),d.set(M,I)),I}function S(v){if(--v.usedTimes===0){const M=l.indexOf(v);l[M]=l[l.length-1],l.pop(),d.delete(v.cacheKey),v.destroy()}}function R(v){o.remove(v)}function A(){o.dispose()}return{getParameters:m,getProgramCacheKey:_,getUniforms:y,acquireProgram:E,releaseProgram:S,releaseShaderCache:R,programs:l,dispose:A}}function Fg(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Og(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Uc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Fc(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let h=0;return u.isInstancedMesh&&(h+=2),u.isSkinnedMesh&&(h+=1),h}function o(u,h,m,_,g,p){let y=i[e];return y===void 0?(y={id:u.id,object:u,geometry:h,material:m,materialVariant:a(u),groupOrder:_,renderOrder:u.renderOrder,z:g,group:p},i[e]=y):(y.id=u.id,y.object=u,y.geometry=h,y.material=m,y.materialVariant=a(u),y.groupOrder=_,y.renderOrder=u.renderOrder,y.z=g,y.group=p),e++,y}function c(u,h,m,_,g,p,y){y.reversedDepth===!0&&(g=-g);const E=o(u,h,m,_,g,p);m.transmission>0?n.push(E):m.transparent===!0?s.push(E):t.push(E)}function l(u,h,m,_,g,p){const y=o(u,h,m,_,g,p);m.transmission>0?n.unshift(y):m.transparent===!0?s.unshift(y):t.unshift(y)}function d(u,h){t.length>1&&t.sort(u||Og),n.length>1&&n.sort(h||Uc),s.length>1&&s.sort(h||Uc)}function f(){for(let u=e,h=i.length;u<h;u++){const m=i[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:f,sort:d}}function Bg(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Fc,i.set(n,[a])):s>=r.length?(a=new Fc,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function zg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new w,color:new Ae};break;case"SpotLight":t={position:new w,direction:new w,color:new Ae,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new Ae,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new Ae,groundColor:new Ae};break;case"RectAreaLight":t={color:new Ae,position:new w,halfWidth:new w,halfHeight:new w};break}return i[e.id]=t,t}}}function kg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Hg=0;function Gg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Vg(i){const e=new zg,t=kg(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new w);const s=new w,r=new it,a=new it;function o(l){let d=0,f=0,u=0;for(let O=0;O<9;O++)n.probe[O].set(0,0,0);let h=0,m=0,_=0,g=0,p=0,y=0,E=0,S=0,R=0,A=0,v=0,M=0,I=0,L=0;l.sort(Gg);for(let O=0,q=l.length;O<q;O++){const D=l[O],V=D.color,J=D.intensity,H=D.distance;let ne=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Ei?ne=D.shadow.map.texture:ne=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)d+=V.r*J,f+=V.g*J,u+=V.b*J;else if(D.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(D.sh.coefficients[X],J);L++}else if(D.isSunLight){const X=e.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const j=D.shadow,ee=t.get(D);ee.shadowIntensity=j.intensity,ee.shadowBias=j.bias,ee.shadowNormalBias=j.normalBias,ee.shadowRadius=j.radius,ee.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()),n.sunShadow[m]=ee,n.sunShadowMap[m]=ne;const Ee=j.getViewportCount();for(let Fe=0;Fe<Ee;Fe++)n.sunShadowMatrix[_+Fe]=j.getMatrix(Fe),n.sunShadowCascade[_+Fe]=j._cascadeData[Fe];_+=Ee,m++}n.sun[h]=X,h++}else if(D.isDirectionalLight){const X=e.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const j=D.shadow,ee=t.get(D);ee.shadowIntensity=j.intensity,ee.shadowBias=j.bias,ee.shadowNormalBias=j.normalBias,ee.shadowRadius=j.radius,ee.shadowMapSize=j.mapSize,n.directionalShadow[g]=ee,n.directionalShadowMap[g]=ne,n.directionalShadowMatrix[g]=D.shadow.matrix,R++}n.directional[g]=X,g++}else if(D.isSpotLight){const X=e.get(D);X.position.setFromMatrixPosition(D.matrixWorld),X.color.copy(V).multiplyScalar(J),X.distance=H,X.coneCos=Math.cos(D.angle),X.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),X.decay=D.decay,n.spot[y]=X;const j=D.shadow;if(D.map&&(n.spotLightMap[M]=D.map,M++,j.updateMatrices(D),D.castShadow&&I++),n.spotLightMatrix[y]=j.matrix,D.castShadow){const ee=t.get(D);ee.shadowIntensity=j.intensity,ee.shadowBias=j.bias,ee.shadowNormalBias=j.normalBias,ee.shadowRadius=j.radius,ee.shadowMapSize=j.mapSize,n.spotShadow[y]=ee,n.spotShadowMap[y]=ne,v++}y++}else if(D.isRectAreaLight){const X=e.get(D);X.color.copy(V).multiplyScalar(J),X.halfWidth.set(D.width*.5,0,0),X.halfHeight.set(0,D.height*.5,0),n.rectArea[E]=X,E++}else if(D.isPointLight){const X=e.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),X.distance=D.distance,X.decay=D.decay,D.castShadow){const j=D.shadow,ee=t.get(D);ee.shadowIntensity=j.intensity,ee.shadowBias=j.bias,ee.shadowNormalBias=j.normalBias,ee.shadowRadius=j.radius,ee.shadowMapSize=j.mapSize,ee.shadowCameraNear=j.camera.near,ee.shadowCameraFar=j.camera.far,n.pointShadow[p]=ee,n.pointShadowMap[p]=ne,n.pointShadowMatrix[p]=D.shadow.matrix,A++}n.point[p]=X,p++}else if(D.isHemisphereLight){const X=e.get(D);X.skyColor.copy(D.color).multiplyScalar(J),X.groundColor.copy(D.groundColor).multiplyScalar(J),n.hemi[S]=X,S++}}E>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=me.LTC_FLOAT_1,n.rectAreaLTC2=me.LTC_FLOAT_2):(n.rectAreaLTC1=me.LTC_HALF_1,n.rectAreaLTC2=me.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=f,n.ambient[2]=u;const U=n.hash;(U.sunLength!==h||U.directionalLength!==g||U.pointLength!==p||U.spotLength!==y||U.rectAreaLength!==E||U.hemiLength!==S||U.numSunShadows!==m||U.numDirectionalShadows!==R||U.numPointShadows!==A||U.numSpotShadows!==v||U.numSpotMaps!==M||U.numLightProbes!==L)&&(n.sun.length=h,n.directional.length=g,n.spot.length=y,n.rectArea.length=E,n.point.length=p,n.hemi.length=S,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=R,n.directionalShadowMap.length=R,n.directionalShadowMatrix.length=R,n.pointShadow.length=A,n.pointShadowMap.length=A,n.pointShadowMatrix.length=A,n.spotShadow.length=v,n.spotShadowMap.length=v,n.spotLightMatrix.length=v+M-I,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=I,n.numLightProbes=L,U.sunLength=h,U.directionalLength=g,U.pointLength=p,U.spotLength=y,U.rectAreaLength=E,U.hemiLength=S,U.numSunShadows=m,U.numDirectionalShadows=R,U.numPointShadows=A,U.numSpotShadows=v,U.numSpotMaps=M,U.numLightProbes=L,n.version=Hg++)}function c(l,d){let f=0,u=0,h=0,m=0,_=0,g=0;const p=d.matrixWorldInverse;for(let y=0,E=l.length;y<E;y++){const S=l[y];if(S.isSunLight){const R=n.sun[f];R.direction.setFromMatrixPosition(S.matrixWorld),R.direction.transformDirection(p),f++}else if(S.isDirectionalLight){const R=n.directional[u];R.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(p),u++}else if(S.isSpotLight){const R=n.spot[m];R.position.setFromMatrixPosition(S.matrixWorld),R.position.applyMatrix4(p),R.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(p),m++}else if(S.isRectAreaLight){const R=n.rectArea[_];R.position.setFromMatrixPosition(S.matrixWorld),R.position.applyMatrix4(p),a.identity(),r.copy(S.matrixWorld),r.premultiply(p),a.extractRotation(r),R.halfWidth.set(S.width*.5,0,0),R.halfHeight.set(0,S.height*.5,0),R.halfWidth.applyMatrix4(a),R.halfHeight.applyMatrix4(a),_++}else if(S.isPointLight){const R=n.point[h];R.position.setFromMatrixPosition(S.matrixWorld),R.position.applyMatrix4(p),h++}else if(S.isHemisphereLight){const R=n.hemi[g];R.direction.setFromMatrixPosition(S.matrixWorld),R.direction.transformDirection(p),g++}}}return{setup:o,setupView:c,state:n}}function Oc(i){const e=new Vg(i),t=[],n=[],s=[];function r(f){d.camera=f,t.length=0,n.length=0,s.length=0}function a(f){f.isLightProbeGrid?s.push(f):t.push(f)}function o(f){n.push(f)}function c(){e.setup(t),s.sort((f,u)=>f.priority-u.priority||f.id-u.id)}function l(f){e.setupView(t,f)}const d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function qg(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Oc(i),e.set(s,[o])):r>=a.length?(o=new Oc(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Wg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Xg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,$g=[new w(1,0,0),new w(-1,0,0),new w(0,1,0),new w(0,-1,0),new w(0,0,1),new w(0,0,-1)],Yg=[new w(0,-1,0),new w(0,-1,0),new w(0,0,1),new w(0,0,-1),new w(0,-1,0),new w(0,-1,0)],Bc=new it,vs=new w,ka=new w;function Kg(i,e,t){let n=new Us;const s=new re,r=new re,a=new pt,o=new ef,c=new tf,l={},d=t.maxTextureSize,f={[Mi]:Wt,[Wt]:Mi,[Zt]:Zt},u=new Qt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new re},radius:{value:4}},vertexShader:Wg,fragmentShader:Xg}),h=u.clone();h.defines.HORIZONTAL_PASS=1;const m=new dt;m.setAttribute("position",new Sn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new We(m,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Er;let p=this.type;this.render=function(A,v,M){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;this.type===fd&&(De("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Er);const I=i.getRenderTarget(),L=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Si),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const q=p!==this.type;q&&v.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(V=>V.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,V=A.length;D<V;D++){const J=A[D],H=J.shadow;if(H===void 0){De("WebGLShadowMap:",J,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const ne=H.getFrameExtents();s.multiply(ne),r.copy(H.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/ne.x),s.x=r.x*ne.x,H.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/ne.y),s.y=r.y*ne.y,H.mapSize.y=r.y));const X=i.state.buffers.depth.getReversed();if(H.camera._reversedDepth=X,H.map===null||q===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===bs){if(J.isPointLight){De("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new en(s.x,s.y,{format:Ei,type:jt,minFilter:Jt,magFilter:Jt,generateMipmaps:!1}),H.map.texture.name=J.name+".shadowMap",H.map.depthTexture=new ts(s.x,s.y,Cn),H.map.depthTexture.name=J.name+".shadowMapDepth",H.map.depthTexture.format=ii,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Lt,H.map.depthTexture.magFilter=Lt}else J.isPointLight?(H.map=new ol(s.x),H.map.depthTexture=new Mu(s.x,Pn)):(H.map=new en(s.x,s.y),H.map.depthTexture=new ts(s.x,s.y,Pn)),H.map.depthTexture.name=J.name+".shadowMap",H.map.depthTexture.format=ii,this.type===Er?(H.map.depthTexture.compareFunction=X?uu:cu,H.map.depthTexture.minFilter=Jt,H.map.depthTexture.magFilter=Jt):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Lt,H.map.depthTexture.magFilter=Lt);H.camera.updateProjectionMatrix()}H.map.isWebGLCubeRenderTarget!==!0&&(H.map.width!==s.x||H.map.height!==s.y)&&H.map.setSize(s.x,s.y);const j=H.map.isWebGLCubeRenderTarget?6:H.getViewportCount();J.isPointLight!==!0&&H.updateMatrices(J,M);const ee=(H.camera.layers.mask&4294967294)!==0?H.camera.layers:M.layers;for(let Ee=0;Ee<j;Ee++){const Fe=H.getCamera(Ee);if(J.isPointLight){const K=H.camera,ge=H.matrix,be=J.distance||K.far;be!==K.far&&(K.far=be,K.updateProjectionMatrix()),vs.setFromMatrixPosition(J.matrixWorld),K.position.copy(vs),ka.copy(K.position),ka.add($g[Ee]),K.up.copy(Yg[Ee]),K.lookAt(ka),K.updateMatrixWorld(),ge.makeTranslation(-vs.x,-vs.y,-vs.z),Bc.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),H._frustum.setFromProjectionMatrix(Bc,K.coordinateSystem,K.reversedDepth)}if(H.map.isWebGLCubeRenderTarget)i.setRenderTarget(H.map,Ee),i.clear();else{Ee===0&&(i.setRenderTarget(H.map),i.clear());const K=H.getViewport(Ee);a.set(r.x*K.x,r.y*K.y,r.x*K.z,r.y*K.w),O.viewport(a)}n=H.getFrustum(Ee),S(v,M,Fe,J,ee,this.type)}H.isPointLightShadow!==!0&&this.type===bs&&y(H,M),H.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(I,L,U)};function y(A,v){const M=e.update(_);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,h.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,h.needsUpdate=!0),A.mapPass===null?A.mapPass=new en(s.x,s.y,{format:Ei,type:jt}):(A.mapPass.width!==A.map.width||A.mapPass.height!==A.map.height)&&A.mapPass.setSize(A.map.width,A.map.height),u.uniforms.shadow_pass.value=A.map.depthTexture,u.uniforms.resolution.value.set(A.map.width,A.map.height),u.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(v,null,M,u,_,null),h.uniforms.shadow_pass.value=A.mapPass.texture,h.uniforms.resolution.value.set(A.map.width,A.map.height),h.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(v,null,M,h,_,null)}function E(A,v,M,I){let L=null;const U=M.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(U!==void 0)L=U;else if(L=M.isPointLight===!0?c:o,i.localClippingEnabled&&v.clipShadows===!0&&Array.isArray(v.clippingPlanes)&&v.clippingPlanes.length!==0||v.displacementMap&&v.displacementScale!==0||v.alphaMap&&v.alphaTest>0||v.map&&v.alphaTest>0||v.alphaToCoverage===!0){const O=L.uuid,q=v.uuid;let D=l[O];D===void 0&&(D={},l[O]=D);let V=D[q];V===void 0&&(V=L.clone(),D[q]=V,v.addEventListener("dispose",R)),L=V}if(L.visible=v.visible,L.wireframe=v.wireframe,I===bs?L.side=v.shadowSide!==null?v.shadowSide:v.side:L.side=v.shadowSide!==null?v.shadowSide:f[v.side],L.alphaMap=v.alphaMap,L.alphaTest=v.alphaToCoverage===!0?.5:v.alphaTest,L.map=v.map,L.clipShadows=v.clipShadows,L.clippingPlanes=v.clippingPlanes,L.clipIntersection=v.clipIntersection,L.displacementMap=v.displacementMap,L.displacementScale=v.displacementScale,L.displacementBias=v.displacementBias,L.wireframeLinewidth=v.wireframeLinewidth,L.linewidth=v.linewidth,M.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const O=i.properties.get(L);O.light=M}return L}function S(A,v,M,I,L,U){if(A.visible===!1)return;if(A.layers.test(L)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&U===bs)&&(!A.frustumCulled||A.intersectsFrustum(n))){A.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,A.matrixWorld);const D=e.update(A),V=A.material;if(Array.isArray(V)){const J=D.groups;for(let H=0,ne=J.length;H<ne;H++){const X=J[H],j=V[X.materialIndex];if(j&&j.visible){const ee=E(A,j,I,U);A.onBeforeShadow(i,A,v,M,D,ee,X),i.renderBufferDirect(M,null,D,ee,A,X),A.onAfterShadow(i,A,v,M,D,ee,X)}}}else if(V.visible){const J=E(A,V,I,U);A.onBeforeShadow(i,A,v,M,D,J,null),i.renderBufferDirect(M,null,D,J,A,null),A.onAfterShadow(i,A,v,M,D,J,null)}}const q=A.children;for(let D=0,V=q.length;D<V;D++)S(q[D],v,M,I,L,U)}function R(A){A.target.removeEventListener("dispose",R);for(const M in l){const I=l[M],L=A.target.uuid;L in I&&(I[L].dispose(),delete I[L])}}}function Zg(i,e){function t(){let C=!1;const Z=new pt;let W=null;const ce=new pt(0,0,0,0);return{setMask:function(se){W!==se&&!C&&(i.colorMask(se,se,se,se),W=se)},setLocked:function(se){C=se},setClear:function(se,oe,we,He,ie){ie===!0&&(se*=He,oe*=He,we*=He),Z.set(se,oe,we,He),ce.equals(Z)===!1&&(i.clearColor(se,oe,we,He),ce.copy(Z))},reset:function(){C=!1,W=null,ce.set(-1,0,0,0)}}}function n(){let C=!1,Z=!1,W=null,ce=null,se=null;return{setReversed:function(oe){if(Z!==oe){const we=e.get("EXT_clip_control");oe?we.clipControlEXT(we.LOWER_LEFT_EXT,we.ZERO_TO_ONE_EXT):we.clipControlEXT(we.LOWER_LEFT_EXT,we.NEGATIVE_ONE_TO_ONE_EXT),Z=oe;const He=se;se=null,this.setClear(He)}},getReversed:function(){return Z},setTest:function(oe){oe?ve(i.DEPTH_TEST):Be(i.DEPTH_TEST)},setMask:function(oe){W!==oe&&!C&&(i.depthMask(oe),W=oe)},setFunc:function(oe){if(Z&&(oe=Xd[oe]),ce!==oe){switch(oe){case qa:i.depthFunc(i.NEVER);break;case Wa:i.depthFunc(i.ALWAYS);break;case Xa:i.depthFunc(i.LESS);break;case Ls:i.depthFunc(i.LEQUAL);break;case $a:i.depthFunc(i.EQUAL);break;case Ya:i.depthFunc(i.GEQUAL);break;case Ka:i.depthFunc(i.GREATER);break;case Za:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ce=oe}},setLocked:function(oe){C=oe},setClear:function(oe){se!==oe&&(se=oe,Z&&(oe=1-oe),i.clearDepth(oe))},reset:function(){C=!1,W=null,ce=null,se=null,Z=!1}}}function s(){let C=!1,Z=null,W=null,ce=null,se=null,oe=null,we=null,He=null,ie=null;return{setTest:function(Re){C||(Re?ve(i.STENCIL_TEST):Be(i.STENCIL_TEST))},setMask:function(Re){Z!==Re&&!C&&(i.stencilMask(Re),Z=Re)},setFunc:function(Re,ze,pe){(W!==Re||ce!==ze||se!==pe)&&(i.stencilFunc(Re,ze,pe),W=Re,ce=ze,se=pe)},setOp:function(Re,ze,pe){(oe!==Re||we!==ze||He!==pe)&&(i.stencilOp(Re,ze,pe),oe=Re,we=ze,He=pe)},setLocked:function(Re){C=Re},setClear:function(Re){ie!==Re&&(i.clearStencil(Re),ie=Re)},reset:function(){C=!1,Z=null,W=null,ce=null,se=null,oe=null,we=null,He=null,ie=null}}}const r=new t,a=new n,o=new s;let c={};const l=new WeakMap;let d={},f={},u={},h=new WeakMap,m=[],_=null,g=!1,p=null,y=null,E=null,S=null,R=null,A=null,v=null,M=new Ae(0,0,0),I=0,L=!1,U=null,O=null,q=null,D=null,V=null;const J=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,ne=0;const X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(X)[1]),H=ne>=1):X.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),H=ne>=2);let j=null,ee={};const Ee=i.getParameter(i.SCISSOR_BOX),Fe=i.getParameter(i.VIEWPORT),K=new pt().fromArray(Ee),ge=new pt().fromArray(Fe);function be(C,Z,W,ce){const se=new Uint8Array(4),oe=i.createTexture();i.bindTexture(C,oe),i.texParameteri(C,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(C,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let we=0;we<W;we++)C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY?i.texImage3D(Z,0,i.RGBA,1,1,ce,0,i.RGBA,i.UNSIGNED_BYTE,se):i.texImage2D(Z+we,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,se);return oe}const Le={};Le[i.TEXTURE_2D]=be(i.TEXTURE_2D,i.TEXTURE_2D,1),Le[i.TEXTURE_CUBE_MAP]=be(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Le[i.TEXTURE_2D_ARRAY]=be(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Le[i.TEXTURE_3D]=be(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ve(i.DEPTH_TEST),a.setFunc(Ls),Xt(!1),ht(Ll),ve(i.CULL_FACE),Rt(Si);function ve(C){d[C]!==!0&&(i.enable(C),d[C]=!0)}function Be(C){d[C]!==!1&&(i.disable(C),d[C]=!1)}function gt(C,Z){return u[C]!==Z?(i.bindFramebuffer(C,Z),u[C]=Z,C===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=Z),C===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=Z),!0):!1}function Ie(C,Z){let W=m,ce=!1;if(C){W=h.get(Z),W===void 0&&(W=[],h.set(Z,W));const se=C.textures;if(W.length!==se.length||W[0]!==i.COLOR_ATTACHMENT0){for(let oe=0,we=se.length;oe<we;oe++)W[oe]=i.COLOR_ATTACHMENT0+oe;W.length=se.length,ce=!0}}else W[0]!==i.BACK&&(W[0]=i.BACK,ce=!0);ce&&i.drawBuffers(W)}function st(C){return _!==C?(i.useProgram(C),_=C,!0):!1}const at={[Xi]:i.FUNC_ADD,[md]:i.FUNC_SUBTRACT,[gd]:i.FUNC_REVERSE_SUBTRACT};at[vd]=i.MIN,at[_d]=i.MAX;const $e={[xd]:i.ZERO,[yd]:i.ONE,[bd]:i.SRC_COLOR,[Qc]:i.SRC_ALPHA,[wd]:i.SRC_ALPHA_SATURATE,[Td]:i.DST_COLOR,[Md]:i.DST_ALPHA,[Sd]:i.ONE_MINUS_SRC_COLOR,[jc]:i.ONE_MINUS_SRC_ALPHA,[Ad]:i.ONE_MINUS_DST_COLOR,[Ed]:i.ONE_MINUS_DST_ALPHA,[Rd]:i.CONSTANT_COLOR,[Cd]:i.ONE_MINUS_CONSTANT_COLOR,[Ld]:i.CONSTANT_ALPHA,[Pd]:i.ONE_MINUS_CONSTANT_ALPHA};function Rt(C,Z,W,ce,se,oe,we,He,ie,Re){if(C===Si){g===!0&&(Be(i.BLEND),g=!1);return}if(g===!1&&(ve(i.BLEND),g=!0),C!==pd){if(C!==p||Re!==L){if((y!==Xi||R!==Xi)&&(i.blendEquation(i.FUNC_ADD),y=Xi,R=Xi),Re)switch(C){case Es:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Gt:i.blendFunc(i.ONE,i.ONE);break;case Pl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Dl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Qe("WebGLState: Invalid blending: ",C);break}else switch(C){case Es:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Gt:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Pl:Qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Dl:Qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qe("WebGLState: Invalid blending: ",C);break}E=null,S=null,A=null,v=null,M.set(0,0,0),I=0,p=C,L=Re}return}se=se||Z,oe=oe||W,we=we||ce,(Z!==y||se!==R)&&(i.blendEquationSeparate(at[Z],at[se]),y=Z,R=se),(W!==E||ce!==S||oe!==A||we!==v)&&(i.blendFuncSeparate($e[W],$e[ce],$e[oe],$e[we]),E=W,S=ce,A=oe,v=we),(He.equals(M)===!1||ie!==I)&&(i.blendColor(He.r,He.g,He.b,ie),M.copy(He),I=ie),p=C,L=!1}function xt(C,Z){C.side===Zt?Be(i.CULL_FACE):ve(i.CULL_FACE);let W=C.side===Wt;Z&&(W=!W),Xt(W),C.blending===Es&&C.transparent===!1?Rt(Si):Rt(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),a.setFunc(C.depthFunc),a.setTest(C.depthTest),a.setMask(C.depthWrite),r.setMask(C.colorWrite);const ce=C.stencilWrite;o.setTest(ce),ce&&(o.setMask(C.stencilWriteMask),o.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),o.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),Et(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?ve(i.SAMPLE_ALPHA_TO_COVERAGE):Be(i.SAMPLE_ALPHA_TO_COVERAGE)}function Xt(C){U!==C&&(C?i.frontFace(i.CW):i.frontFace(i.CCW),U=C)}function ht(C){C!==dd?(ve(i.CULL_FACE),C!==O&&(C===Ll?i.cullFace(i.BACK):C===hd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Be(i.CULL_FACE),O=C}function En(C){C!==q&&(H&&i.lineWidth(C),q=C)}function Et(C,Z,W){C?(ve(i.POLYGON_OFFSET_FILL),(D!==Z||V!==W)&&(D=Z,V=W,a.getReversed()&&(Z=-Z,W=-W),i.polygonOffset(Z,W))):Be(i.POLYGON_OFFSET_FILL)}function on(C){C?ve(i.SCISSOR_TEST):Be(i.SCISSOR_TEST)}function ln(C){C===void 0&&(C=i.TEXTURE0+J-1),j!==C&&(i.activeTexture(C),j=C)}function cn(C,Z,W){W===void 0&&(j===null?W=i.TEXTURE0+J-1:W=j);let ce=ee[W];ce===void 0&&(ce={type:void 0,texture:void 0},ee[W]=ce),(ce.type!==C||ce.texture!==Z)&&(j!==W&&(i.activeTexture(W),j=W),i.bindTexture(C,Z||Le[C]),ce.type=C,ce.texture=Z)}function F(){const C=ee[j];C!==void 0&&C.type!==void 0&&(i.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function un(){try{i.compressedTexImage2D(...arguments)}catch(C){Qe("WebGLState:",C)}}function ct(){try{i.compressedTexImage3D(...arguments)}catch(C){Qe("WebGLState:",C)}}function ut(){try{i.texSubImage2D(...arguments)}catch(C){Qe("WebGLState:",C)}}function fe(){try{i.texSubImage3D(...arguments)}catch(C){Qe("WebGLState:",C)}}function yt(){try{i.compressedTexSubImage2D(...arguments)}catch(C){Qe("WebGLState:",C)}}function Pe(){try{i.compressedTexSubImage3D(...arguments)}catch(C){Qe("WebGLState:",C)}}function Ne(){try{i.texStorage2D(...arguments)}catch(C){Qe("WebGLState:",C)}}function T(){try{i.texStorage3D(...arguments)}catch(C){Qe("WebGLState:",C)}}function x(){try{i.texImage2D(...arguments)}catch(C){Qe("WebGLState:",C)}}function z(){try{i.texImage3D(...arguments)}catch(C){Qe("WebGLState:",C)}}function te(C){return f[C]!==void 0?f[C]:i.getParameter(C)}function Q(C,Z){f[C]!==Z&&(i.pixelStorei(C,Z),f[C]=Z)}function ae(C){K.equals(C)===!1&&(i.scissor(C.x,C.y,C.z,C.w),K.copy(C))}function de(C){ge.equals(C)===!1&&(i.viewport(C.x,C.y,C.z,C.w),ge.copy(C))}function $(C,Z){let W=l.get(Z);W===void 0&&(W=new WeakMap,l.set(Z,W));let ce=W.get(C);ce===void 0&&(ce=i.getUniformBlockIndex(Z,C.name),i.uniformBlockBinding(Z,ce,ce),W.set(C,ce))}function Y(C,Z,W){const se=l.get(Z).get(C);c[se]!==W&&(i.bindBufferBase(i.UNIFORM_BUFFER,se,W),c[se]=W)}function le(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),d={},f={},j=null,ee={},u={},c={},h=new WeakMap,m=[],_=null,g=!1,p=null,y=null,E=null,S=null,R=null,A=null,v=null,M=new Ae(0,0,0),I=0,L=!1,U=null,O=null,q=null,D=null,V=null,K.set(0,0,i.canvas.width,i.canvas.height),ge.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ve,disable:Be,bindFramebuffer:gt,drawBuffers:Ie,useProgram:st,setBlending:Rt,setMaterial:xt,setFlipSided:Xt,setCullFace:ht,setLineWidth:En,setPolygonOffset:Et,setScissorTest:on,activeTexture:ln,bindTexture:cn,unbindTexture:F,compressedTexImage2D:un,compressedTexImage3D:ct,texImage2D:x,texImage3D:z,pixelStorei:Q,getParameter:te,updateUBOMapping:$,uniformBlockBinding:Y,texStorage2D:Ne,texStorage3D:T,texSubImage2D:ut,texSubImage3D:fe,compressedTexSubImage2D:yt,compressedTexSubImage3D:Pe,scissor:ae,viewport:de,reset:le}}function Jg(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new re,d=new WeakMap,f=new Set;let u;const h=new WeakMap,m=new Set,_=new FinalizationRegistry(T=>m.delete(T));let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(T,x){return g?new OffscreenCanvas(T,x):Br("canvas")}function y(T,x,z){let te=1;const Q=Ne(T);if((Q.width>z||Q.height>z)&&(te=z/Math.max(Q.width,Q.height)),te<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const ae=Math.floor(te*Q.width),de=Math.floor(te*Q.height);u===void 0&&(u=p(ae,de));const $=x?p(ae,de):u;return $.width=ae,$.height=de,$.getContext("2d").drawImage(T,0,0,ae,de),De("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+ae+"x"+de+")."),$}else return"data"in T&&De("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),T;return T}function E(T){return T.generateMipmaps}function S(T){i.generateMipmap(T)}function R(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function A(T,x,z,te,Q,ae=!1){if(T!==null){if(i[T]!==void 0)return i[T];De("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let de;te&&(de=e.get("EXT_texture_norm16"),de||De("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=x;if(x===i.RED&&(z===i.FLOAT&&($=i.R32F),z===i.HALF_FLOAT&&($=i.R16F),z===i.UNSIGNED_BYTE&&($=i.R8),z===i.UNSIGNED_SHORT&&de&&($=de.R16_EXT),z===i.SHORT&&de&&($=de.R16_SNORM_EXT)),x===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&($=i.R8UI),z===i.UNSIGNED_SHORT&&($=i.R16UI),z===i.UNSIGNED_INT&&($=i.R32UI),z===i.BYTE&&($=i.R8I),z===i.SHORT&&($=i.R16I),z===i.INT&&($=i.R32I)),x===i.RG&&(z===i.FLOAT&&($=i.RG32F),z===i.HALF_FLOAT&&($=i.RG16F),z===i.UNSIGNED_BYTE&&($=i.RG8),z===i.UNSIGNED_SHORT&&de&&($=de.RG16_EXT),z===i.SHORT&&de&&($=de.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&($=i.RG8UI),z===i.UNSIGNED_SHORT&&($=i.RG16UI),z===i.UNSIGNED_INT&&($=i.RG32UI),z===i.BYTE&&($=i.RG8I),z===i.SHORT&&($=i.RG16I),z===i.INT&&($=i.RG32I)),x===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&($=i.RGB8UI),z===i.UNSIGNED_SHORT&&($=i.RGB16UI),z===i.UNSIGNED_INT&&($=i.RGB32UI),z===i.BYTE&&($=i.RGB8I),z===i.SHORT&&($=i.RGB16I),z===i.INT&&($=i.RGB32I)),x===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&($=i.RGBA8UI),z===i.UNSIGNED_SHORT&&($=i.RGBA16UI),z===i.UNSIGNED_INT&&($=i.RGBA32UI),z===i.BYTE&&($=i.RGBA8I),z===i.SHORT&&($=i.RGBA16I),z===i.INT&&($=i.RGBA32I)),x===i.RGB&&(z===i.UNSIGNED_SHORT&&de&&($=de.RGB16_EXT),z===i.SHORT&&de&&($=de.RGB16_SNORM_EXT),z===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&($=i.R11F_G11F_B10F)),x===i.RGBA){const Y=ae?Or:Ze.getTransfer(Q);z===i.FLOAT&&($=i.RGBA32F),z===i.HALF_FLOAT&&($=i.RGBA16F),z===i.UNSIGNED_BYTE&&($=Y===nt?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT&&de&&($=de.RGBA16_EXT),z===i.SHORT&&de&&($=de.RGBA16_SNORM_EXT),z===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function v(T,x){let z;return T?x===null||x===Pn||x===es?z=i.DEPTH24_STENCIL8:x===Cn?z=i.DEPTH32F_STENCIL8:x===Ds&&(z=i.DEPTH24_STENCIL8,De("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Pn||x===es?z=i.DEPTH_COMPONENT24:x===Cn?z=i.DEPTH_COMPONENT32F:x===Ds&&(z=i.DEPTH_COMPONENT16),z}function M(T,x){return E(T)===!0||T.isFramebufferTexture&&T.minFilter!==Lt&&T.minFilter!==Jt?Math.log2(Math.max(x.width,x.height))+1:T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?x.mipmaps.length:1}function I(T){const x=new WeakRef(T);n.get(T).__ref=x,m.add(x),_.register(T,x,x)}function L(T){const x=n.get(T).__ref;x!==void 0&&(m.delete(x),_.unregister(x))}function U(T){q(T.target)}function O(T){D(T.target)}function q(T){T.removeEventListener("dispose",U),L(T),J(T),T.isVideoTexture&&d.delete(T),T.isHTMLTexture&&f.delete(T)}function D(T){T.removeEventListener("dispose",O),L(T),ne(T)}function V(){for(const T of m){const x=T.deref();x!==void 0&&(x.isRenderTarget===!0?D(x):q(x))}m.clear(),f.clear()}function J(T){const x=n.get(T);if(x.__webglInit===void 0)return;const z=T.source,te=h.get(z);if(te){const Q=te[x.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&H(T),Object.keys(te).length===0&&h.delete(z)}n.remove(T)}function H(T){const x=n.get(T);i.deleteTexture(x.__webglTexture);const z=T.source,te=h.get(z);delete te[x.__cacheKey],a.memory.textures--}function ne(T){const x=n.get(T);x.__depthDisposeCallback&&x.__depthDisposeCallback();const z=T.depthTexture;if(z&&z.renderTarget===T&&q(z),T.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(x.__webglFramebuffer[Q]))for(let ae=0;ae<x.__webglFramebuffer[Q].length;ae++)i.deleteFramebuffer(x.__webglFramebuffer[Q][ae]);else i.deleteFramebuffer(x.__webglFramebuffer[Q]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[Q])}else{if(Array.isArray(x.__webglFramebuffer))for(let Q=0;Q<x.__webglFramebuffer.length;Q++)i.deleteFramebuffer(x.__webglFramebuffer[Q]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let Q=0;Q<x.__webglColorRenderbuffer.length;Q++)x.__webglColorRenderbuffer[Q]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[Q]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const te=T.textures;for(let Q=0,ae=te.length;Q<ae;Q++){const de=n.get(te[Q]);de.__webglTexture&&(i.deleteTexture(de.__webglTexture),a.memory.textures--),n.remove(te[Q])}n.remove(T)}let X=0;function j(){X=0}function ee(){return X}function Ee(T){X=T}function Fe(){const T=X;return T>=s.maxTextures&&De("WebGLTextures: Trying to use "+(T+1)+" texture units while this GPU supports only "+s.maxTextures),X+=1,T}function K(T){const x=[];return x.push(T.wrapS),x.push(T.wrapT),x.push(T.wrapR||0),x.push(T.magFilter),x.push(T.minFilter),x.push(T.anisotropy),x.push(T.internalFormat),x.push(T.format),x.push(T.type),x.push(T.generateMipmaps),x.push(T.mipmapsAutoUpdate),x.push(T.premultiplyAlpha),x.push(T.flipY),x.push(T.unpackAlignment),x.push(T.colorSpace),x.join()}function ge(T,x){const z=n.get(T);if(T.isVideoTexture&&yt(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&z.__version!==T.version){const te=T.image;if(te===null)De("WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)De("WebGLRenderer: Texture marked for update but image is incomplete");else{xt(z,T,x);return}}else T.isExternalTexture&&(z.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+x)}function be(T,x){const z=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&z.__version!==T.version){xt(z,T,x);return}else T.isExternalTexture&&(z.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+x)}function Le(T,x){const z=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&z.__version!==T.version){xt(z,T,x);return}t.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+x)}function ve(T,x){const z=n.get(T);if(T.version>0&&z.__version!==T.version){Xt(z,T,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+x)}const Be={[Ja]:i.REPEAT,[zn]:i.CLAMP_TO_EDGE,[Qa]:i.MIRRORED_REPEAT},gt={[Lt]:i.NEAREST,[Nd]:i.NEAREST_MIPMAP_NEAREST,[Ws]:i.NEAREST_MIPMAP_LINEAR,[Jt]:i.LINEAR,[ca]:i.LINEAR_MIPMAP_NEAREST,[ti]:i.LINEAR_MIPMAP_LINEAR},Ie={[Bd]:i.NEVER,[du]:i.ALWAYS,[zd]:i.LESS,[cu]:i.LEQUAL,[kd]:i.EQUAL,[uu]:i.GEQUAL,[Hd]:i.GREATER,[Gd]:i.NOTEQUAL};function st(T,x){if(x.type===Cn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Jt||x.magFilter===ca||x.magFilter===Ws||x.magFilter===ti||x.minFilter===Jt||x.minFilter===ca||x.minFilter===Ws||x.minFilter===ti)&&De("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,Be[x.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,Be[x.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,Be[x.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,gt[x.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,gt[x.minFilter]),x.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,Ie[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Lt||x.minFilter!==Ws&&x.minFilter!==ti||x.type===Cn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function at(T,x){let z=!1;T.__webglInit===void 0&&(T.__webglInit=!0,x.addEventListener("dispose",U),I(x));const te=x.source;let Q=h.get(te);Q===void 0&&(Q={},h.set(te,Q));const ae=K(x);if(ae!==T.__cacheKey){Q[ae]===void 0&&(Q[ae]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,z=!0),Q[ae].usedTimes++;const de=Q[T.__cacheKey];de!==void 0&&(Q[T.__cacheKey].usedTimes--,de.usedTimes===0&&H(x)),T.__cacheKey=ae,T.__webglTexture=Q[ae].texture}return z}function $e(T,x,z){return Math.floor(Math.floor(T/z)/x)}function Rt(T,x,z,te){const ae=T.updateRanges;if(ae.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,z,te,x.data);else{ae.sort((C,Z)=>C.start-Z.start);let de=0;for(let C=1;C<ae.length;C++){const Z=ae[de],W=ae[C],ce=Z.start+Z.count,se=$e(W.start,x.width,4),oe=$e(Z.start,x.width,4);W.start<=ce+1&&se===oe&&$e(W.start+W.count-1,x.width,4)===se?Z.count=Math.max(Z.count,W.start+W.count-Z.start):(++de,ae[de]=W)}ae.length=de+1;const $=t.getParameter(i.UNPACK_ROW_LENGTH),Y=t.getParameter(i.UNPACK_SKIP_PIXELS),le=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let C=0,Z=ae.length;C<Z;C++){const W=ae[C],ce=Math.floor(W.start/4),se=Math.ceil(W.count/4),oe=ce%x.width,we=Math.floor(ce/x.width),He=se,ie=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,oe),t.pixelStorei(i.UNPACK_SKIP_ROWS,we),t.texSubImage2D(i.TEXTURE_2D,0,oe,we,He,ie,z,te,x.data)}T.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,$),t.pixelStorei(i.UNPACK_SKIP_PIXELS,Y),t.pixelStorei(i.UNPACK_SKIP_ROWS,le)}}function xt(T,x,z){let te=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(te=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(te=i.TEXTURE_3D);const Q=at(T,x),ae=x.source;t.bindTexture(te,T.__webglTexture,i.TEXTURE0+z);const de=n.get(ae);if(ae.version!==de.__version||Q===!0){if(t.activeTexture(i.TEXTURE0+z),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const ie=Ze.getPrimaries(Ze.workingColorSpace),Re=x.colorSpace===ei?null:Ze.getPrimaries(x.colorSpace),ze=x.colorSpace===ei||ie===Re?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ze)}t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let Y=y(x.image,!1,s.maxTextureSize);Y=Pe(x,Y);const le=r.convert(x.format,x.colorSpace),C=r.convert(x.type);let Z=A(x.internalFormat,le,C,x.normalized,x.colorSpace,x.isVideoTexture);st(te,x);let W;const ce=x.mipmaps,se=x.isVideoTexture!==!0,oe=de.__version===void 0||Q===!0,we=ae.dataReady,He=M(x,Y);if(x.isDepthTexture)Z=v(x.format===ni,x.type),oe&&(se?t.texStorage2D(i.TEXTURE_2D,1,Z,Y.width,Y.height):t.texImage2D(i.TEXTURE_2D,0,Z,Y.width,Y.height,0,le,C,null));else if(x.isDataTexture)if(ce.length>0){se&&oe&&t.texStorage2D(i.TEXTURE_2D,He,Z,ce[0].width,ce[0].height);for(let ie=0,Re=ce.length;ie<Re;ie++)W=ce[ie],se?we&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,W.width,W.height,le,C,W.data):t.texImage2D(i.TEXTURE_2D,ie,Z,W.width,W.height,0,le,C,W.data);x.generateMipmaps=!1}else se?(oe&&t.texStorage2D(i.TEXTURE_2D,He,Z,Y.width,Y.height),we&&Rt(x,Y,le,C)):t.texImage2D(i.TEXTURE_2D,0,Z,Y.width,Y.height,0,le,C,Y.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){se&&oe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,He,Z,ce[0].width,ce[0].height,Y.depth);for(let ie=0,Re=ce.length;ie<Re;ie++)if(W=ce[ie],x.format!==Ln)if(le!==null)if(se){if(we)if(x.layerUpdates.size>0){const ze=vc(W.width,W.height,x.format,x.type);for(const pe of x.layerUpdates){const rt=W.data.subarray(pe*ze/W.data.BYTES_PER_ELEMENT,(pe+1)*ze/W.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,pe,W.width,W.height,1,le,rt)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,W.width,W.height,Y.depth,le,W.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ie,Z,W.width,W.height,Y.depth,0,W.data,0,0);else De("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else se?we&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,W.width,W.height,Y.depth,le,C,W.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ie,Z,W.width,W.height,Y.depth,0,le,C,W.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{se&&oe&&t.texStorage2D(i.TEXTURE_2D,He,Z,ce[0].width,ce[0].height);for(let ie=0,Re=ce.length;ie<Re;ie++)W=ce[ie],x.format!==Ln?le!==null?se?we&&t.compressedTexSubImage2D(i.TEXTURE_2D,ie,0,0,W.width,W.height,le,W.data):t.compressedTexImage2D(i.TEXTURE_2D,ie,Z,W.width,W.height,0,W.data):De("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):se?we&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,W.width,W.height,le,C,W.data):t.texImage2D(i.TEXTURE_2D,ie,Z,W.width,W.height,0,le,C,W.data)}else if(x.isDataArrayTexture)if(se){if(oe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,He,Z,Y.width,Y.height,Y.depth),we)if(x.layerUpdates.size>0){const ie=vc(Y.width,Y.height,x.format,x.type);for(const Re of x.layerUpdates){const ze=Y.data.subarray(Re*ie/Y.data.BYTES_PER_ELEMENT,(Re+1)*ie/Y.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Re,Y.width,Y.height,1,le,C,ze)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Y.width,Y.height,Y.depth,le,C,Y.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Z,Y.width,Y.height,Y.depth,0,le,C,Y.data);else if(x.isData3DTexture)se?(oe&&t.texStorage3D(i.TEXTURE_3D,He,Z,Y.width,Y.height,Y.depth),we&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Y.width,Y.height,Y.depth,le,C,Y.data)):t.texImage3D(i.TEXTURE_3D,0,Z,Y.width,Y.height,Y.depth,0,le,C,Y.data);else if(x.isFramebufferTexture){if(oe)if(se)t.texStorage2D(i.TEXTURE_2D,He,Z,Y.width,Y.height);else{let ie=Y.width,Re=Y.height;for(let ze=0;ze<He;ze++)t.texImage2D(i.TEXTURE_2D,ze,Z,ie,Re,0,le,C,null),ie>>=1,Re>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){const ie=i.canvas;if(ie.hasAttribute("layoutsubtree")||ie.setAttribute("layoutsubtree","true"),Y.parentNode!==ie){ie.appendChild(Y),f.add(x),ie.onpaint=Re=>{const ze=Re.changedElements;for(const pe of f)ze.includes(pe.image)&&(pe.needsUpdate=!0)},ie.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,Y);else{const ze=i.RGBA,pe=i.RGBA,rt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,ze,pe,rt,Y)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ce.length>0){if(se&&oe){const ie=Ne(ce[0]);t.texStorage2D(i.TEXTURE_2D,He,Z,ie.width,ie.height)}for(let ie=0,Re=ce.length;ie<Re;ie++)W=ce[ie],se?we&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,le,C,W):t.texImage2D(i.TEXTURE_2D,ie,Z,le,C,W);x.generateMipmaps=!1}else if(se){if(oe){const ie=Ne(Y);t.texStorage2D(i.TEXTURE_2D,He,Z,ie.width,ie.height)}we&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,le,C,Y)}else t.texImage2D(i.TEXTURE_2D,0,Z,le,C,Y);E(x)&&x.mipmapsAutoUpdate===!0&&S(te),de.__version=ae.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function Xt(T,x,z){if(x.image.length!==6)return;const te=at(T,x),Q=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+z);const ae=n.get(Q);if(Q.version!==ae.__version||te===!0){t.activeTexture(i.TEXTURE0+z);const de=Ze.getPrimaries(Ze.workingColorSpace),$=x.colorSpace===ei?null:Ze.getPrimaries(x.colorSpace),Y=x.colorSpace===ei||de===$?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Y);const le=x.isCompressedTexture||x.image[0].isCompressedTexture,C=x.image[0]&&x.image[0].isDataTexture,Z=[];for(let pe=0;pe<6;pe++)!le&&!C?Z[pe]=y(x.image[pe],!0,s.maxCubemapSize):Z[pe]=C?x.image[pe].image:x.image[pe],Z[pe]=Pe(x,Z[pe]);const W=Z[0],ce=r.convert(x.format,x.colorSpace),se=r.convert(x.type);let oe=A(x.internalFormat,ce,se,x.normalized,x.colorSpace);const we=x.isVideoTexture!==!0,He=ae.__version===void 0||te===!0,ie=Q.dataReady;let Re=M(x,W);st(i.TEXTURE_CUBE_MAP,x);let ze;if(x.isDepthTexture){if(oe=v(x.format===ni,x.type),He)if(we)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,oe,W.width,W.height);else for(let pe=0;pe<6;pe++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,oe,W.width,W.height,0,ce,se,null)}else if(le){we&&He&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Re,oe,W.width,W.height);for(let pe=0;pe<6;pe++){ze=Z[pe].mipmaps;for(let rt=0;rt<ze.length;rt++){const Tt=ze[rt];x.format!==Ln?ce!==null?we?ie&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,rt,0,0,Tt.width,Tt.height,ce,Tt.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,rt,oe,Tt.width,Tt.height,0,Tt.data):De("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):we?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,rt,0,0,Tt.width,Tt.height,ce,se,Tt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,rt,oe,Tt.width,Tt.height,0,ce,se,Tt.data)}}}else{if(ze=x.mipmaps,we&&He){ze.length>0&&Re++;const pe=Ne(Z[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Re,oe,pe.width,pe.height)}for(let pe=0;pe<6;pe++)if(C){we?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,Z[pe].width,Z[pe].height,ce,se,Z[pe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,oe,Z[pe].width,Z[pe].height,0,ce,se,Z[pe].data);for(let rt=0;rt<ze.length;rt++){const Xn=ze[rt].image[pe].image;we?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,rt+1,0,0,Xn.width,Xn.height,ce,se,Xn.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,rt+1,oe,Xn.width,Xn.height,0,ce,se,Xn.data)}}else{we?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,ce,se,Z[pe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,oe,ce,se,Z[pe]);for(let rt=0;rt<ze.length;rt++){const Tt=ze[rt];we?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,rt+1,0,0,ce,se,Tt.image[pe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,rt+1,oe,ce,se,Tt.image[pe])}}}E(x)&&x.mipmapsAutoUpdate===!0&&S(i.TEXTURE_CUBE_MAP),ae.__version=Q.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function ht(T,x,z,te,Q,ae){const de=r.convert(z.format,z.colorSpace),$=r.convert(z.type),Y=A(z.internalFormat,de,$,z.normalized,z.colorSpace),le=n.get(x),C=n.get(z);if(C.__renderTarget=x,!le.__hasExternalTextures){const Z=Math.max(1,x.width>>ae),W=Math.max(1,x.height>>ae);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?t.texImage3D(Q,ae,Y,Z,W,x.depth,0,de,$,null):t.texImage2D(Q,ae,Y,Z,W,0,de,$,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),fe(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,te,Q,C.__webglTexture,0,ut(x)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,te,Q,C.__webglTexture,ae),t.bindFramebuffer(i.FRAMEBUFFER,null)}function En(T,x,z){if(i.bindRenderbuffer(i.RENDERBUFFER,T),x.depthBuffer){const te=x.depthTexture,Q=te&&te.isDepthTexture?te.type:null,ae=v(x.stencilBuffer,Q),de=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;fe(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ut(x),ae,x.width,x.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,ut(x),ae,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,ae,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,de,i.RENDERBUFFER,T)}else{const te=x.textures;for(let Q=0;Q<te.length;Q++){const ae=te[Q],de=r.convert(ae.format,ae.colorSpace),$=r.convert(ae.type),Y=A(ae.internalFormat,de,$,ae.normalized,ae.colorSpace);fe(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ut(x),Y,x.width,x.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,ut(x),Y,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,Y,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Et(T,x,z){const te=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Q=n.get(x.depthTexture);Q.__renderTarget=x;const ae=te?x.depthTexture.image[0]:x.depthTexture.image;(!Q.__webglTexture||ae.width!==x.width||ae.height!==x.height)&&(ae.width=x.width,ae.height=x.height,x.depthTexture.needsUpdate=!0),te?ve(x.depthTexture,0):ge(x.depthTexture,0);const de=Q.__webglTexture,$=ut(x),Y=te?i.TEXTURE_CUBE_MAP_POSITIVE_X+z:i.TEXTURE_2D,le=x.depthTexture.format===ni?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===ii)fe(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,le,Y,de,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,le,Y,de,0);else if(x.depthTexture.format===ni)fe(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,le,Y,de,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,le,Y,de,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function on(T){const x=n.get(T),z=T.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==T.depthTexture){const te=T.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),te){const Q=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,te.removeEventListener("dispose",Q)};te.addEventListener("dispose",Q),x.__depthDisposeCallback=Q}x.__boundDepthTexture=te}if(T.depthTexture&&!x.__autoAllocateDepthBuffer)if(z)for(let te=0;te<6;te++)Et(x.__webglFramebuffer[te],T,te);else T.texture.mipmaps.length>0?Et(x.__webglFramebuffer[0],T,0):Et(x.__webglFramebuffer,T,0);else if(z){x.__webglDepthbuffer=[];for(let te=0;te<6;te++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[te]),x.__webglDepthbuffer[te]===void 0)x.__webglDepthbuffer[te]=i.createRenderbuffer(),En(x.__webglDepthbuffer[te],T,!1);else{const Q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=x.__webglDepthbuffer[te];i.bindRenderbuffer(i.RENDERBUFFER,ae),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,ae)}}else if(T.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),En(x.__webglDepthbuffer,T,!1);else{const Q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ae),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,ae)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ln(T,x,z){const te=n.get(T);x!==void 0&&ht(te.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&on(T)}function cn(T){const x=T.texture,z=n.get(T),te=n.get(x);T.addEventListener("dispose",O),I(T);const Q=T.textures,ae=T.isWebGLCubeRenderTarget===!0,de=Q.length>1;if(de||(te.__webglTexture===void 0&&(te.__webglTexture=i.createTexture()),te.__version=x.version,a.memory.textures++),ae){z.__webglFramebuffer=[];for(let $=0;$<6;$++)if(x.mipmaps.length>0){z.__webglFramebuffer[$]=[];for(let Y=0;Y<x.mipmaps.length;Y++)z.__webglFramebuffer[$][Y]=i.createFramebuffer()}else z.__webglFramebuffer[$]=i.createFramebuffer()}else{if(x.mipmaps.length>0){z.__webglFramebuffer=[];for(let $=0;$<x.mipmaps.length;$++)z.__webglFramebuffer[$]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(de)for(let $=0,Y=Q.length;$<Y;$++){const le=n.get(Q[$]);le.__webglTexture===void 0&&(le.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&fe(T)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let $=0;$<Q.length;$++){const Y=Q[$];z.__webglColorRenderbuffer[$]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[$]);const le=r.convert(Y.format,Y.colorSpace),C=r.convert(Y.type),Z=A(Y.internalFormat,le,C,Y.normalized,Y.colorSpace,T.isXRRenderTarget===!0),W=ut(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,W,Z,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+$,i.RENDERBUFFER,z.__webglColorRenderbuffer[$])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),En(z.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ae){t.bindTexture(i.TEXTURE_CUBE_MAP,te.__webglTexture),st(i.TEXTURE_CUBE_MAP,x);for(let $=0;$<6;$++)if(x.mipmaps.length>0)for(let Y=0;Y<x.mipmaps.length;Y++)ht(z.__webglFramebuffer[$][Y],T,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Y);else ht(z.__webglFramebuffer[$],T,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);E(x)?S(i.TEXTURE_CUBE_MAP):x.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,x.mipmaps.length-1),t.unbindTexture()}else if(de){for(let $=0,Y=Q.length;$<Y;$++){const le=Q[$],C=n.get(le);let Z=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(Z=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Z,C.__webglTexture),st(Z,le),ht(z.__webglFramebuffer,T,le,i.COLOR_ATTACHMENT0+$,Z,0),E(le)&&S(Z)}t.unbindTexture()}else{let $=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&($=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture($,te.__webglTexture),st($,x),x.mipmaps.length>0)for(let Y=0;Y<x.mipmaps.length;Y++)ht(z.__webglFramebuffer[Y],T,x,i.COLOR_ATTACHMENT0,$,Y);else ht(z.__webglFramebuffer,T,x,i.COLOR_ATTACHMENT0,$,0);E(x)?S($):x.mipmaps.length>0&&i.texParameteri($,i.TEXTURE_MAX_LEVEL,x.mipmaps.length-1),t.unbindTexture()}T.depthBuffer&&on(T)}function F(T){const x=T.textures;for(let z=0,te=x.length;z<te;z++){const Q=x[z];if(E(Q)&&Q.mipmapsAutoUpdate===!0){const ae=R(T),de=n.get(Q).__webglTexture;t.bindTexture(ae,de),S(ae),t.unbindTexture()}}}const un=[];function ct(T){if(T.samples>0){if(fe(T)===!1){const x=T.textures,z=T.width,te=T.height;let Q=i.COLOR_BUFFER_BIT;const ae=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,de=n.get(T),$=x.length>1;if($)for(let le=0;le<x.length;le++)t.bindFramebuffer(i.FRAMEBUFFER,de.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,de.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,de.__webglMultisampledFramebuffer),T.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,de.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,de.__webglFramebuffer);for(let le=0;le<x.length;le++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),$){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,de.__webglColorRenderbuffer[le]);const C=n.get(x[le]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,C,0)}i.blitFramebuffer(0,0,z,te,0,0,z,te,Q,i.NEAREST),c===!0&&(un.length=0,un.push(i.COLOR_ATTACHMENT0+le),T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&un.push(ae),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,un))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),$)for(let le=0;le<x.length;le++){t.bindFramebuffer(i.FRAMEBUFFER,de.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.RENDERBUFFER,de.__webglColorRenderbuffer[le]);const C=n.get(x[le]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,de.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.TEXTURE_2D,C,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,de.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&c){const x=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function ut(T){return Math.min(s.maxSamples,T.samples)}function fe(T){const x=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function yt(T){const x=a.render.frame;d.get(T)!==x&&(d.set(T,x),T.update())}function Pe(T,x){const z=T.colorSpace,te=T.format,Q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||z!==Fr&&z!==ei&&(Ze.getTransfer(z)===nt?(te!==Ln||Q!==sn)&&De("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qe("WebGLTextures: Unsupported texture color space:",z)),x}function Ne(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=Fe,this.resetTextureUnits=j,this.getTextureUnits=ee,this.setTextureUnits=Ee,this.setTexture2D=ge,this.setTexture2DArray=be,this.setTexture3D=Le,this.setTextureCube=ve,this.rebindTextures=ln,this.setupRenderTarget=cn,this.updateRenderTargetMipmap=F,this.updateMultisampleRenderTarget=ct,this.setupDepthRenderbuffer=on,this.setupFrameBufferTexture=ht,this.useMultisampledRTT=fe,this.dispose=V}function Qg(i,e){function t(n,s=ei){let r;const a=Ze.getTransfer(s);if(n===sn)return i.UNSIGNED_BYTE;if(n===qo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Wo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===su)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ru)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===nu)return i.BYTE;if(n===iu)return i.SHORT;if(n===Ds)return i.UNSIGNED_SHORT;if(n===Vo)return i.INT;if(n===Pn)return i.UNSIGNED_INT;if(n===Cn)return i.FLOAT;if(n===jt)return i.HALF_FLOAT;if(n===au)return i.ALPHA;if(n===ou)return i.RGB;if(n===Ln)return i.RGBA;if(n===ii)return i.DEPTH_COMPONENT;if(n===ni)return i.DEPTH_STENCIL;if(n===lu)return i.RED;if(n===Xo)return i.RED_INTEGER;if(n===Ei)return i.RG;if(n===$o)return i.RG_INTEGER;if(n===Yo)return i.RGBA_INTEGER;if(n===Tr||n===Ar||n===wr||n===Rr)if(a===nt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Tr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Tr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ar)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===wr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Rr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ja||n===eo||n===to||n===no)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ja)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===eo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===to)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===no)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===io||n===so||n===ro||n===ao||n===oo||n===Nr||n===lo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===io||n===so)return a===nt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ro)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ao)return r.COMPRESSED_R11_EAC;if(n===oo)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Nr)return r.COMPRESSED_RG11_EAC;if(n===lo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===co||n===uo||n===ho||n===fo||n===po||n===mo||n===go||n===vo||n===_o||n===xo||n===yo||n===bo||n===So||n===Mo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===co)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===uo)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ho)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===fo)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===po)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===mo)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===go)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===vo)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===_o)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===xo)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===yo)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===bo)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===So)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Mo)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Eo||n===To||n===Ao)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Eo)return a===nt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===To)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ao)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===wo||n===Ro||n===Ur||n===Co)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===wo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ro)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ur)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Co)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===es?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const jg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ev=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class tv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Eu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Qt({vertexShader:jg,fragmentShader:ev,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new We(new ks(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class nv extends ai{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,d=null,f=null,u=null,h=null,m=null;const _=typeof XRWebGLBinding<"u",g=new tv,p={},y=t.getContextAttributes();let E=null,S=null;const R=[],A=[],v=new re;let M=null,I=null;const L=new pn;L.viewport=new pt;const U=new pn;U.viewport=new pt;const O=[L,U],q=new lf;let D=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let ge=R[K];return ge===void 0&&(ge=new ga,R[K]=ge),ge.getTargetRaySpace()},this.getControllerGrip=function(K){let ge=R[K];return ge===void 0&&(ge=new ga,R[K]=ge),ge.getGripSpace()},this.getHand=function(K){let ge=R[K];return ge===void 0&&(ge=new ga,R[K]=ge),ge.getHandSpace()};function J(K){const ge=A.indexOf(K.inputSource);if(ge===-1)return;const be=R[ge];be!==void 0&&(be.update(K.inputSource,K.frame,l||a),be.dispatchEvent({type:K.type,data:K.inputSource}))}function H(){s.removeEventListener("select",J),s.removeEventListener("selectstart",J),s.removeEventListener("selectend",J),s.removeEventListener("squeeze",J),s.removeEventListener("squeezestart",J),s.removeEventListener("squeezeend",J),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",ne);for(let K=0;K<R.length;K++){const ge=A[K];ge!==null&&(A[K]=null,R[K].disconnect(ge))}D=null,V=null,g.reset();for(const K in p)delete p[K];if(e.setRenderTarget(E),h=null,u=null,f=null,s=null,S=null,Fe.stop(),n.isPresenting=!1,e.setPixelRatio(M),e.setSize(v.width,v.height,!1),I!==null){const K=I.camera;K.fov=I.fov,K.zoom=I.zoom,K.updateProjectionMatrix(),I=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&De("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,n.isPresenting===!0&&De("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return u!==null?u:h},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(E=e.getRenderTarget(),s.addEventListener("select",J),s.addEventListener("selectstart",J),s.addEventListener("selectend",J),s.addEventListener("squeeze",J),s.addEventListener("squeezestart",J),s.addEventListener("squeezeend",J),s.addEventListener("end",H),s.addEventListener("inputsourceschange",ne),y.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(v),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let be=null,Le=null,ve=null;y.depth&&(ve=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,be=y.stencil?ni:ii,Le=y.stencil?es:Pn);const Be={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(Be),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),S=new en(u.textureWidth,u.textureHeight,{format:Ln,type:sn,depthTexture:new ts(u.textureWidth,u.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,be),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const be={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};h=new XRWebGLLayer(s,t,be),s.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),S=new en(h.framebufferWidth,h.framebufferHeight,{format:Ln,type:sn,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Fe.setContext(s),Fe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function ne(K){for(let ge=0;ge<K.removed.length;ge++){const be=K.removed[ge],Le=A.indexOf(be);Le>=0&&(A[Le]=null,R[Le].disconnect(be))}for(let ge=0;ge<K.added.length;ge++){const be=K.added[ge];let Le=A.indexOf(be);if(Le===-1){for(let Be=0;Be<R.length;Be++)if(Be>=A.length){A.push(be),Le=Be;break}else if(A[Be]===null){A[Be]=be,Le=Be;break}if(Le===-1)break}const ve=R[Le];ve&&ve.connect(be)}}function X(K,ge){ge===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(ge.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let ge=K.near,be=K.far;g.texture!==null&&(g.depthNear>0&&(ge=g.depthNear),g.depthFar>0&&(be=g.depthFar)),q.near=U.near=L.near=ge,q.far=U.far=L.far=be,(D!==q.near||V!==q.far)&&(s.updateRenderState({depthNear:q.near,depthFar:q.far}),D=q.near,V=q.far),q.layers.mask=K.layers.mask|6,L.layers.mask=q.layers.mask&-5,U.layers.mask=q.layers.mask&-3;const Le=K.parent,ve=q.cameras;X(q,Le);for(let Be=0;Be<ve.length;Be++)X(ve[Be],Le);q.projectionMatrix.copy(L.projectionMatrix),q.projectionMatrixInverse.copy(L.projectionMatrixInverse),I===null&&K.isPerspectiveCamera&&(I={camera:K,fov:K.fov,zoom:K.zoom}),j(K,q,Le)};function j(K,ge,be){be===null?K.matrix.copy(ge.matrixWorld):(K.matrix.copy(be.matrixWorld),K.matrix.invert(),K.matrix.multiply(ge.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(ge.projectionMatrix),K.projectionMatrixInverse.copy(ge.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Ns*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return q},this.getFoveation=function(){if(!(u===null&&h===null))return c},this.setFoveation=function(K){c=K,u!==null&&(u.fixedFoveation=K),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=K)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(q)},this.getCameraTexture=function(K){return p[K]};let ee=null;function Ee(K,ge){if(d=ge.getViewerPose(l||a),m=ge,d!==null){const be=d.views;h!==null&&(e.setRenderTargetFramebuffer(S,h.framebuffer),e.setRenderTarget(S));let Le=!1;be.length!==q.cameras.length&&(q.cameras.length=0,Le=!0);for(let Ie=0;Ie<be.length;Ie++){const st=be[Ie];let at=null;if(h!==null)at=h.getViewport(st);else{const Rt=f.getViewSubImage(u,st);at=Rt.viewport,Ie===0&&(e.setRenderTargetTextures(S,Rt.colorTexture,Rt.depthStencilTexture),e.setRenderTarget(S))}let $e=O[Ie];$e===void 0&&($e=new pn,$e.layers.enable(Ie),$e.viewport=new pt,O[Ie]=$e),$e.matrix.fromArray(st.transform.matrix),$e.matrix.decompose($e.position,$e.quaternion,$e.scale),$e.projectionMatrix.fromArray(st.projectionMatrix),$e.projectionMatrixInverse.copy($e.projectionMatrix).invert(),$e.viewport.set(at.x,at.y,at.width,at.height),Ie===0&&(q.matrix.copy($e.matrix),q.matrix.decompose(q.position,q.quaternion,q.scale)),Le===!0&&q.cameras.push($e)}const ve=s.enabledFeatures;if(ve&&ve.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){f=n.getBinding();const Ie=f.getDepthInformation(be[0]);Ie&&Ie.isValid&&Ie.texture&&g.init(Ie,s.renderState)}if(ve&&ve.includes("camera-access")&&_){e.state.unbindTexture(),f=n.getBinding();for(let Ie=0;Ie<be.length;Ie++){const st=be[Ie].camera;if(st){let at=p[st];at||(at=new Eu,p[st]=at);const $e=f.getCameraImage(st);at.sourceTexture=$e}}}}for(let be=0;be<R.length;be++){const Le=A[be],ve=R[be];Le!==null&&ve!==void 0&&ve.update(Le,ge,l||a)}ee&&ee(K,ge),ge.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ge}),m=null}const Fe=new Pu;Fe.setAnimationLoop(Ee),this.setAnimationLoop=function(K){ee=K},this.dispose=function(){}}}const iv=new it,Hu=new Ue;Hu.set(-1,0,0,0,1,0,0,0,1);function sv(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,wu(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,y,E,S){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),f(g,p)):p.isMeshPhongMaterial?(r(g,p),d(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),u(g,p),p.isMeshPhysicalMaterial&&h(g,p,S)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?c(g,p,y,E):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Wt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Wt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const y=e.get(p),E=y.envMap,S=y.envMapRotation;E&&(g.envMap.value=E,g.envMapRotation.value.setFromMatrix4(iv.makeRotationFromEuler(S)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Hu),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,y,E){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*y,g.scale.value=E*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function d(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function f(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function u(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function h(g,p,y){g.ior.value=p.ior,p.diffuseRoughness>0&&(g.diffuseRoughness.value=p.diffuseRoughness,p.diffuseRoughnessMap&&(g.diffuseRoughnessMap.value=p.diffuseRoughnessMap,t(p.diffuseRoughnessMap,g.diffuseRoughnessMapTransform))),p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Wt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessMinimum,g.iridescenceThicknessMaximum.value=p.iridescenceThicknessMaximum,p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){const y=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function rv(i,e,t,n){let s={},r={};function a(y,E){const S=E.program;n.uniformBlockBinding(y,S,s[y.id])}function o(y,E){let S=s[y.id];S===void 0&&(m(y),S=c(y),s[y.id]=S,y.addEventListener("dispose",g));const R=E.program;n.updateUBOMapping(y,R);const A=e.render.frame;r[y.id]!==A&&(l(y),r[y.id]=A)}function c(y){const E=i.createBuffer(),S=y.__size,R=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,S,R),i.bindBuffer(i.UNIFORM_BUFFER,null),E}function l(y){const E=s[y.id],S=y.uniforms,R=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let A=0,v=S.length;A<v;A++){const M=S[A];if(Array.isArray(M))for(let I=0,L=M.length;I<L;I++)d(M[I],A,I,R);else d(M,A,0,R)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(y,E,S,R){if(u(y,E,S,R)===!0){const A=y.__offset,v=y.value;if(Array.isArray(v)){let M=0;for(let I=0;I<v.length;I++){const L=v[I],U=_(L,!0);f(L,y.__data,M),M+=U.storage/Float32Array.BYTES_PER_ELEMENT}}else f(v,y.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,A,y.__data)}}function f(y,E,S){typeof y=="number"||typeof y=="boolean"?E[S]=y:y.isMatrix3?(E[S]=y.elements[0],E[S+1]=y.elements[1],E[S+2]=y.elements[2],E[S+3]=0,E[S+4]=y.elements[3],E[S+5]=y.elements[4],E[S+6]=y.elements[5],E[S+7]=0,E[S+8]=y.elements[6],E[S+9]=y.elements[7],E[S+10]=y.elements[8],E[S+11]=0):ArrayBuffer.isView(y)?E.set(y.subarray(0,E.length-S),S):y.toArray(E,S)}function u(y,E,S,R){const A=y.value,v=E+"_"+S;if(Array.isArray(A)){R[v]===void 0&&(R[v]=[]);const M=R[v];let I=!1;for(let L=0;L<A.length;L++)h(A[L],M,L)===!0&&(I=!0);return I}return h(A,R,v)}function h(y,E,S){if(E[S]===void 0)return typeof y=="number"||typeof y=="boolean"?E[S]=y:ArrayBuffer.isView(y)?E[S]=y.slice():E[S]=y.clone(),!0;{const R=E[S];if(typeof y=="number"||typeof y=="boolean"){if(R!==y)return E[S]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(R.equals(y)===!1)return R.copy(y),!0}}return!1}function m(y){const E=y.uniforms;let S=0;const R=16;for(let v=0,M=E.length;v<M;v++){const I=Array.isArray(E[v])?E[v]:[E[v]];for(let L=0,U=I.length;L<U;L++){const O=I[L],q=Array.isArray(O.value)?O.value:[O.value],D=Array.isArray(E[v])||Array.isArray(O.value);let V=S;for(let H=0,ne=q.length;H<ne;H++){const X=q[H],j=_(X,D),ee=S%R,Ee=ee%j.boundary,Fe=ee+Ee;S+=Ee,Fe!==0&&R-Fe<j.storage&&(S+=R-Fe),H===0&&(V=S),S+=j.storage}const J=O.type==="int"?Int32Array:O.type==="uint"?Uint32Array:Float32Array;O.__data=new J((S-V)/Float32Array.BYTES_PER_ELEMENT),O.__offset=V}}const A=S%R;return A>0&&(S+=R-A),y.__size=S,y.__cache={},this}function _(y,E){const S={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(S.boundary=4,S.storage=4):y.isVector2?(S.boundary=8,S.storage=8):y.isVector3||y.isColor?(S.boundary=16,S.storage=12):y.isVector4?(S.boundary=16,S.storage=16):y.isMatrix3?(S.boundary=16,S.storage=48):y.isMatrix4?(S.boundary=16,S.storage=64):y.isTexture?De("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(S.boundary=16,S.storage=y.byteLength):De("WebGLRenderer: Unsupported uniform value type.",y),E===!0&&(S.boundary=16,S.storage=Math.ceil(S.storage/16)*16),S}function g(y){const E=y.target;E.removeEventListener("dispose",g),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function p(){for(const y in s)i.deleteBuffer(s[y]);s={},r={}}return{bind:a,update:o,dispose:p}}const av=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let An=null;function ov(){return An===null&&(An=new Ph(av,16,16,Ei,jt),An.name="DFG_LUT",An.minFilter=Jt,An.magFilter=Jt,An.wrapS=zn,An.wrapT=zn,An.generateMipmaps=!1,An.needsUpdate=!0),An}class lv{constructor(e={}){const{canvas:t=qd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:h=sn}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;const _=h,g=new Set([Yo,$o,Xo]),p=new Set([sn,Pn,Ds,es,qo,Wo]),y=new Uint32Array(4),E=new Int32Array(4),S={textures:[],min:[],max:[],resolution:[]};let R=null,A=null;const v=[],M=[];let I=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Vn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let U=!1,O=null,q=null,D=null,V=null;this._outputColorSpace=Kt;let J=0,H=0,ne=null,X=-1,j=null;const ee=new pt,Ee=new pt;let Fe=null;const K=new Ae(0);let ge=0,be=t.width,Le=t.height,ve=1,Be=null,gt=null;const Ie=new pt(0,0,be,Le),st=new pt(0,0,be,Le);let at=!1;const $e=new Us,Rt=new tl;let xt=!1,Xt=!1;const ht=new it,En=new w,Et=new pt,on={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ln=!1;function cn(){return ne===null?ve:1}let F=n;function un(b,P){return t.getContext(b,P)}let ct,ut,fe,yt,Pe,Ne,T,x,z,te,Q,ae,de,$,Y,le,C,Z,W,ce,se,oe,we;try{const b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Fo}`),t.addEventListener("webglcontextlost",Re,!1),t.addEventListener("webglcontextrestored",ze,!1),t.addEventListener("webglcontextcreationerror",pe,!1),F===null){const P="webgl2";if(F=un(P,b),F===null)throw un(P)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}He()}catch(b){throw t.removeEventListener("webglcontextlost",Re,!1),t.removeEventListener("webglcontextrestored",ze,!1),t.removeEventListener("webglcontextcreationerror",pe,!1),Qe("WebGLRenderer: "+b.message),b}function He(){ct=new d0(F),ct.init(),se=new Qg(F,ct),ut=new e0(F,ct,e,se),fe=new Zg(F,ct),ut.reversedDepthBuffer&&u&&fe.buffers.depth.setReversed(!0),q=F.createFramebuffer(),D=F.createFramebuffer(),V=F.createFramebuffer(),yt=new p0(F),Pe=new Fg,Ne=new Jg(F,ct,fe,Pe,ut,se,yt),T=new u0(L),x=new gf(F),oe=new Qm(F,x),z=new h0(F,x,yt,oe),te=new g0(F,z,x,oe,yt),Z=new m0(F,ut,Ne),Y=new t0(Pe),Q=new Ug(L,T,ct,ut,oe,Y),ae=new sv(L,Pe),de=new Bg,$=new qg(ct),C=new Jm(L,T,fe,te,m,c),le=new Kg(L,te,ut),we=new rv(F,yt,ut,fe),W=new jm(F,ct,yt),ce=new f0(F,ct,yt),yt.programs=Q.programs,L.capabilities=ut,L.extensions=ct,L.properties=Pe,L.renderLists=de,L.shadowMap=le,L.state=fe,L.info=yt}_!==sn&&(I=new _0(_,t.width,t.height,o,s,r));const ie=new nv(L,F);this.xr=ie,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const b=ct.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=ct.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return ve},this.setPixelRatio=function(b){b!==void 0&&(ve=b,this.setSize(be,Le,!1))},this.getSize=function(b){return b.set(be,Le)},this.setSize=function(b,P,G=!0){if(ie.isPresenting){De("WebGLRenderer: Can't change size while VR device is presenting.");return}be=b,Le=P,t.width=Math.floor(b*ve),t.height=Math.floor(P*ve),G===!0&&(t.style.width=b+"px",t.style.height=P+"px"),I!==null&&I.setSize(t.width,t.height),this.setViewport(0,0,b,P)},this.getDrawingBufferSize=function(b){return b.set(be*ve,Le*ve).floor()},this.setDrawingBufferSize=function(b,P,G){be=b,Le=P,ve=G,t.width=Math.floor(b*G),t.height=Math.floor(P*G),this.setViewport(0,0,b,P)},this.setEffects=function(b){if(_===sn){Qe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let P=0;P<b.length;P++)if(b[P].isOutputPass===!0){De("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}I.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(ee)},this.getViewport=function(b){return b.copy(Ie)},this.setViewport=function(b,P,G,B){b.isVector4?Ie.set(b.x,b.y,b.z,b.w):Ie.set(b,P,G,B),fe.viewport(ee.copy(Ie).multiplyScalar(cn()).round())},this.getScissor=function(b){return b.copy(st)},this.setScissor=function(b,P,G,B){b.isVector4?st.set(b.x,b.y,b.z,b.w):st.set(b,P,G,B),fe.scissor(Ee.copy(st).multiplyScalar(cn()).round())},this.getScissorTest=function(){return at},this.setScissorTest=function(b){fe.setScissorTest(at=b)},this.setOpaqueSort=function(b){Be=b},this.setTransparentSort=function(b){gt=b},this.getClearColor=function(b){return b.copy(C.getClearColor())},this.setClearColor=function(){C.setClearColor(...arguments)},this.getClearAlpha=function(){return C.getClearAlpha()},this.setClearAlpha=function(){C.setClearAlpha(...arguments)},this.clear=function(b=!0,P=!0,G=!0){let B=0;if(b){let k=!1;if(ne!==null){const he=ne.texture.format;k=g.has(he)}if(k){const he=ne.texture.type,ye=p.has(he),ue=C.getClearColor(),_e=C.getClearAlpha(),Te=ue.r,Oe=ue.g,Ye=ue.b;ye?(y[0]=Te,y[1]=Oe,y[2]=Ye,y[3]=_e,F.clearBufferuiv(F.COLOR,0,y)):(E[0]=Te,E[1]=Oe,E[2]=Ye,E[3]=_e,F.clearBufferiv(F.COLOR,0,E))}else B|=F.COLOR_BUFFER_BIT}P&&(B|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(B|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B!==0&&F.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),O=b},this.dispose=function(){t.removeEventListener("webglcontextlost",Re,!1),t.removeEventListener("webglcontextrestored",ze,!1),t.removeEventListener("webglcontextcreationerror",pe,!1),C.dispose(),de.dispose(),$.dispose(),Ne.dispose(),Pe.dispose(),T.dispose(),te.dispose(),z.dispose(),oe.dispose(),we.dispose(),Q.dispose(),ie.dispose(),ie.removeEventListener("sessionstart",yl),ie.removeEventListener("sessionend",bl),hi.stop()};function Re(b){b.preventDefault(),zr("WebGLRenderer: Context Lost."),U=!0}function ze(){zr("WebGLRenderer: Context Restored."),U=!1;const b=yt.autoReset,P=le.enabled,G=le.autoUpdate,B=le.needsUpdate,k=le.type;He(),yt.autoReset=b,le.enabled=P,le.autoUpdate=G,le.needsUpdate=B,le.type=k}function pe(b){Qe("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function rt(b){const P=b.target;P.removeEventListener("dispose",rt),Tt(P)}function Tt(b){Xn(b),Pe.remove(b)}function Xn(b){const P=Pe.get(b).programs;P!==void 0&&(P.forEach(function(G){Q.releaseProgram(G)}),b.isShaderMaterial&&Q.releaseShaderCache(b))}this.renderBufferDirect=function(b,P,G,B,k,he){P===null&&(P=on);const ye=k.isMesh&&k.matrixWorld.determinantAffine()<0,ue=ld(b,P,G,B,k);fe.setMaterial(B,ye);let _e=G.index,Te=1;if(B.wireframe===!0){if(_e=z.getWireframeAttribute(G),_e===void 0)return;Te=2}const Oe=G.drawRange,Ye=G.attributes.position;let Se=Oe.start*Te,Ke=(Oe.start+Oe.count)*Te;he!==null&&(Se=Math.max(Se,he.start*Te),Ke=Math.min(Ke,(he.start+he.count)*Te)),_e!==null?(Se=Math.max(Se,0),Ke=Math.min(Ke,_e.count)):Ye!=null&&(Se=Math.max(Se,0),Ke=Math.min(Ke,Ye.count));const vt=Ke-Se;if(vt<0||vt===1/0)return;oe.setup(k,B,ue,G,_e);let lt,ot=W;if(_e!==null&&(lt=x.get(_e),ot=ce,ot.setIndex(lt)),k.isMesh)B.wireframe===!0?(fe.setLineWidth(B.wireframeLinewidth*cn()),ot.setMode(F.LINES)):ot.setMode(F.TRIANGLES);else if(k.isLine){let It=B.linewidth;It===void 0&&(It=1),fe.setLineWidth(It*cn()),k.isLineSegments?ot.setMode(F.LINES):k.isLineLoop?ot.setMode(F.LINE_LOOP):ot.setMode(F.LINE_STRIP)}else k.isPoints?ot.setMode(F.POINTS):k.isSprite&&ot.setMode(F.TRIANGLES);if(k.isBatchedMesh)if(ct.get("WEBGL_multi_draw"))ot.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const It=k._multiDrawStarts,Me=k._multiDrawCounts,zt=k._multiDrawCount,je=_e?x.get(_e).bytesPerElement:1,fi=Pe.get(B).currentProgram.getUniforms();for(let Nt=0;Nt<zt;Nt++)fi.setValue(F,"_gl_DrawID",Nt),ot.render(It[Nt]/je,Me[Nt])}else if(k.isInstancedMesh)ot.renderInstances(Se,vt,k.count);else if(G.isInstancedBufferGeometry){const It=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Me=Math.min(G.instanceCount,It);ot.renderInstances(Se,vt,Me)}else ot.render(Se,vt)};function xl(b,P,G,B){O!==null&&b.isNodeMaterial&&O.setObject(B,b),xt===!0&&Y.setState(b,G,!1),b.transparent===!0&&b.side===Zt&&b.forceSinglePass===!1?(b.side=Wt,b.needsUpdate=!0,ls(b,P,B),b.side=Mi,b.needsUpdate=!0,ls(b,P,B),b.side=Zt):ls(b,P,B)}this.compile=function(b,P,G=null){G===null&&(G=b),O!==null&&O.renderStart(b,P,G),A=$.get(G),A.init(P),M.push(A),G.traverseVisible(function(k){k.isLight&&k.layers.test(P.layers)&&(A.pushLight(k),k.castShadow&&A.pushShadow(k))}),b!==G&&b.traverseVisible(function(k){k.isLight&&k.layers.test(P.layers)&&(A.pushLight(k),k.castShadow&&A.pushShadow(k))}),A.setupLights(),O!==null&&O.updateLights(A.state.lightsArray),Xt=this.localClippingEnabled,xt=Y.init(this.clippingPlanes,Xt),xt===!0&&Y.setGlobalState(this.clippingPlanes,P),O!==null&&le.render(A.state.shadowsArray,G,P);const B=new Set;return b.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const he=k.material;if(he)if(Array.isArray(he))for(let ye=0;ye<he.length;ye++){const ue=he[ye];xl(ue,G,P,k),B.add(ue)}else xl(he,G,P,k),B.add(he)}),A=M.pop(),O!==null&&O.renderEnd(),B},this.compileAsync=function(b,P,G=null){const B=this.compile(b,P,G);return new Promise(k=>{function he(){if(B.forEach(function(ye){const _e=Pe.get(ye).currentProgram;(_e===void 0||_e.isReady())&&B.delete(ye)}),B.size===0){k(b);return}setTimeout(he,10)}ct.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let ra=null;function ad(b){ra&&ra(b)}function yl(){hi.stop()}function bl(){hi.start()}const hi=new Pu;hi.setAnimationLoop(ad),typeof self<"u"&&hi.setContext(self),this.setAnimationLoop=function(b){ra=b,ie.setAnimationLoop(b),b===null?hi.stop():hi.start()},ie.addEventListener("sessionstart",yl),ie.addEventListener("sessionend",bl),this.render=function(b,P){if(P!==void 0&&P.isCamera!==!0){Qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;O!==null&&O.renderStart(b,P);const G=ie.enabled===!0&&ie.isPresenting===!0,B=I!==null&&(ne===null||G)&&I.begin(L,ne);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),ie.enabled===!0&&ie.isPresenting===!0&&(I===null||I.isCompositing()===!1)&&(ie.cameraAutoUpdate===!0&&ie.updateCamera(P),P=ie.getCamera()),b.isScene===!0&&b.onBeforeRender(L,b,P,ne),A=$.get(b,M.length),A.init(P),A.state.textureUnits=Ne.getTextureUnits(),M.push(A),ht.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),P.isArrayCamera?Rt.setFromArrayCamera(P):$e.setFromProjectionMatrix(ht,bn,P.reversedDepth),Xt=this.localClippingEnabled,xt=Y.init(this.clippingPlanes,Xt),R=de.get(b,v.length),R.init(),v.push(R),this.info.render.frame++,ie.enabled===!0&&ie.isPresenting===!0){const ye=L.xr.getDepthSensingMesh();ye!==null&&aa(ye,P,-1/0,L.sortObjects)}aa(b,P,0,L.sortObjects),R.finish(),O!==null&&O.updateLights(A.state.lightsArray),L.sortObjects===!0&&R.sort(Be,gt),ln=ie.enabled===!1||ie.isPresenting===!1||ie.hasDepthSensing()===!1,ln&&C.addToRenderList(R,b),this.info.autoReset===!0&&this.info.reset(),xt===!0&&Y.beginShadows();const k=A.state.shadowsArray;if(le.render(k,b,P),xt===!0&&Y.endShadows(),(B&&I.hasRenderPass())===!1){const ye=R.opaque,ue=R.transmissive;if(A.setupLights(),P.isArrayCamera){const _e=P.cameras;if(ue.length>0)for(let Te=0,Oe=_e.length;Te<Oe;Te++){const Ye=_e[Te];Ml(ye,ue,b,Ye)}ln&&C.render(b);for(let Te=0,Oe=_e.length;Te<Oe;Te++){const Ye=_e[Te];Sl(R,b,Ye,Ye.viewport)}}else ue.length>0&&Ml(ye,ue,b,P),ln&&C.render(b),Sl(R,b,P)}ne!==null&&H===0&&(Ne.updateMultisampleRenderTarget(ne),Ne.updateRenderTargetMipmap(ne)),B&&I.end(L),b.isScene===!0&&b.onAfterRender(L,b,P),oe.resetDefaultState(),X=-1,j=null,M.pop(),M.length>0?(A=M[M.length-1],Ne.setTextureUnits(A.state.textureUnits),xt===!0&&Y.setGlobalState(L.clippingPlanes,A.state.camera)):A=null,v.pop(),v.length>0?R=v[v.length-1]:R=null,O!==null&&O.renderEnd()};function aa(b,P,G,B){if(b.visible===!1)return;if(b.layers.test(P.layers)){if(b.isGroup)G=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(P);else if(b.isLight)A.pushLight(b),b.castShadow&&A.pushShadow(b);else if(b.isSprite){const ye=P.isArrayCamera?Rt:$e;if(!b.frustumCulled||b.intersectsFrustum(ye)){B&&Et.setFromMatrixPosition(b.matrixWorld).applyMatrix4(ht);const ue=te.update(b),_e=b.material;_e.visible&&R.push(b,ue,_e,G,Et.z,null,P)}}else if(b.isMesh||b.isLine||b.isPoints){const ye=P.isArrayCamera?Rt:$e;if(!b.frustumCulled||b.intersectsFrustum(ye)){const ue=te.update(b),_e=b.material;if(B&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Et.copy(b.boundingSphere.center)):(ue.boundingSphere===null&&ue.computeBoundingSphere(),Et.copy(ue.boundingSphere.center)),Et.applyMatrix4(b.matrixWorld).applyMatrix4(ht)),Array.isArray(_e)){const Te=ue.groups;for(let Oe=0,Ye=Te.length;Oe<Ye;Oe++){const Se=Te[Oe],Ke=_e[Se.materialIndex];Ke&&Ke.visible&&R.push(b,ue,Ke,G,Et.z,Se,P)}}else _e.visible&&R.push(b,ue,_e,G,Et.z,null,P)}}}const he=b.children;for(let ye=0,ue=he.length;ye<ue;ye++)aa(he[ye],P,G,B)}function Sl(b,P,G,B){const{opaque:k,transmissive:he,transparent:ye}=b;A.setupLightsView(G),xt===!0&&Y.setGlobalState(L.clippingPlanes,G),B&&fe.viewport(ee.copy(B)),k.length>0&&Vs(k,P,G),he.length>0&&Vs(he,P,G),ye.length>0&&Vs(ye,P,G),fe.buffers.depth.setTest(!0),fe.buffers.depth.setMask(!0),fe.buffers.color.setMask(!0),fe.setPolygonOffset(!1)}function Ml(b,P,G,B){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[B.id]===void 0){const Se=ct.has("EXT_color_buffer_half_float")||ct.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[B.id]=new en(1,1,{generateMipmaps:!0,type:Se?jt:sn,minFilter:ti,samples:Math.max(4,ut.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ze.workingColorSpace})}const he=A.state.transmissionRenderTarget[B.id],ye=B.viewport||ee;he.setSize(ye.z*L.transmissionResolutionScale,ye.w*L.transmissionResolutionScale);const ue=L.getRenderTarget(),_e=L.getActiveCubeFace(),Te=L.getActiveMipmapLevel();L.setRenderTarget(he),L.getClearColor(K),ge=L.getClearAlpha(),ge<1&&L.setClearColor(16777215,.5),L.clear(),ln&&C.render(G);const Oe=L.toneMapping;L.toneMapping=Vn;const Ye=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),A.setupLightsView(B),xt===!0&&Y.setGlobalState(L.clippingPlanes,B),Vs(b,G,B),Ne.updateMultisampleRenderTarget(he),Ne.updateRenderTargetMipmap(he),ct.has("WEBGL_multisampled_render_to_texture")===!1){let Se=!1;for(let Ke=0,vt=P.length;Ke<vt;Ke++){const lt=P[Ke],{object:ot,geometry:It,material:Me,group:zt}=lt;if(Me.side===Zt&&ot.layers.test(B.layers)){const je=Me.side;Me.side=Wt,Me.needsUpdate=!0,El(ot,G,B,It,Me,zt),Me.side=je,Me.needsUpdate=!0,Se=!0}}Se===!0&&(Ne.updateMultisampleRenderTarget(he),Ne.updateRenderTargetMipmap(he))}L.setRenderTarget(ue,_e,Te),L.setClearColor(K,ge),Ye!==void 0&&(B.viewport=Ye),L.toneMapping=Oe}function Vs(b,P,G){const B=P.isScene===!0?P.overrideMaterial:null;for(let k=0,he=b.length;k<he;k++){const ye=b[k],{object:ue,geometry:_e,group:Te}=ye;let Oe=ye.material;Oe.allowOverride===!0&&B!==null&&(Oe=B),ue.layers.test(G.layers)&&El(ue,P,G,_e,Oe,Te)}}function El(b,P,G,B,k,he){O!==null&&k.isNodeMaterial&&O.setObject(b,k),b.onBeforeRender(L,P,G,B,k,he),b.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),k.onBeforeRender(L,P,G,B,b,he),k.transparent===!0&&k.side===Zt&&k.forceSinglePass===!1?(k.side=Wt,k.needsUpdate=!0,L.renderBufferDirect(G,P,B,k,b,he),k.side=Mi,k.needsUpdate=!0,L.renderBufferDirect(G,P,B,k,b,he),k.side=Zt):L.renderBufferDirect(G,P,B,k,b,he),b.onAfterRender(L,P,G,B,k,he)}function Tl(b){let P=0;for(const G of b)G.texture!==null&&P++;return P}function ls(b,P,G){P.isScene!==!0&&(P=on);const B=Pe.get(b),k=A.state.lights,he=A.state.shadowsArray,ye=k.state.version,ue=Q.getParameters(b,k.state,he,P,G,A.state.lightProbeGridArray),_e=Q.getProgramCacheKey(ue);let Te=B.programs;B.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?P.environment:null,B.fog=P.fog;const Oe=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;B.envMap=T.get(b.envMap||B.environment,Oe),B.envMapRotation=B.environment!==null&&b.envMap===null?P.environmentRotation:b.envMapRotation,Te===void 0&&(b.addEventListener("dispose",rt),Te=new Map,B.programs=Te,B.programVariants=new Map);let Ye=Te.get(_e);if(Ye!==void 0){if(B.currentProgram===Ye&&B.lightsStateVersion===ye)return wl(b,ue),Ye}else ue.uniforms=Q.getUniforms(b),O!==null&&b.isNodeMaterial&&O.build(b,G,ue),b.onBeforeCompile(ue,L),Ye=Q.acquireProgram(ue,_e),Te.set(_e,Ye),B.uniforms=ue.uniforms;const Se=B.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Se.clippingPlanes=Y.uniform),wl(b,ue),B.needsLights=ud(b),B.lightsStateVersion=ye,B.needsLights&&(Se.ambientLightColor.value=k.state.ambient,Se.lightProbe.value=k.state.probe,Se.sunLights.value=k.state.sun,Se.sunLightShadows.value=k.state.sunShadow,Se.directionalLights.value=k.state.directional,Se.directionalLightShadows.value=k.state.directionalShadow,Se.spotLights.value=k.state.spot,Se.spotLightShadows.value=k.state.spotShadow,Se.rectAreaLights.value=k.state.rectArea,Se.ltc_1.value=k.state.rectAreaLTC1,Se.ltc_2.value=k.state.rectAreaLTC2,Se.pointLights.value=k.state.point,Se.pointLightShadows.value=k.state.pointShadow,Se.hemisphereLights.value=k.state.hemi,Se.sunShadowMatrix.value=k.state.sunShadowMatrix,Se.sunShadowCascade.value=k.state.sunShadowCascade,Se.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Se.spotLightMatrix.value=k.state.spotLightMatrix,Se.spotLightMap.value=k.state.spotLightMap,Se.pointShadowMatrix.value=k.state.pointShadowMatrix),B.numLightProbeGrids=Tl(A.state.lightProbeGridArray),B.currentProgram=Ye,B.uniformsList=null,Ye}function od(b,P,G,B,k){const he=Pe.get(b),ye=he.currentProgram.id+","+B+","+k;let ue=he.programVariants.get(ye);return ue===void 0?(ue=ls(b,P,G),he.programVariants.set(ye,ue)):(he.currentProgram=ue,he.uniformsList=null,he.outputColorSpace=B,he.toneMapping=k),ue}function Al(b){if(b.uniformsList===null){const P=b.currentProgram.getUniforms();b.uniformsList=Pr.seqWithValue(P.seq,b.uniforms)}return b.uniformsList}function wl(b,P){const G=Pe.get(b);G.outputColorSpace=P.outputColorSpace,G.batching=P.batching,G.batchingColor=P.batchingColor,G.instancing=P.instancing,G.instancingColor=P.instancingColor,G.instancingMorph=P.instancingMorph,G.skinning=P.skinning,G.morphTargets=P.morphTargets,G.morphNormals=P.morphNormals,G.morphColors=P.morphColors,G.morphTargetsCount=P.morphTargetsCount,G.numClippingPlanes=P.numClippingPlanes,G.numIntersection=P.numClipIntersection,G.vertexAlphas=P.vertexAlphas,G.vertexTangents=P.vertexTangents,G.toneMapping=P.toneMapping}function ld(b,P,G,B,k){P.isScene!==!0&&(P=on),Ne.resetTextureUnits();const he=P.fog,ye=B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial?P.environment:null,ue=ne===null?L.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Ze.workingColorSpace,_e=B.isMeshStandardMaterial||B.isMeshLambertMaterial&&!B.envMap||B.isMeshPhongMaterial&&!B.envMap,Te=T.get(B.envMap||ye,_e),Oe=B.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Ye=!!G.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Se=!!G.morphAttributes.position,Ke=!!G.morphAttributes.normal,vt=!!G.morphAttributes.color;let lt=Vn;B.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(lt=L.toneMapping);const ot=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,It=ot!==void 0?ot.length:0,Me=Pe.get(B),zt=A.state.lights;if(xt===!0&&(Xt===!0||b!==j)){const ft=b===j&&B.id===X;Y.setState(B,b,ft)}let je=!1,fi=!1;B.version===Me.__version?Me.needsLights&&Me.lightsStateVersion!==zt.state.version||k.isBatchedMesh&&Me.batching===!1||!k.isBatchedMesh&&Me.batching===!0||k.isBatchedMesh&&Me.batchingColor===!0&&k._colorsTexture===null||k.isBatchedMesh&&Me.batchingColor===!1&&k._colorsTexture!==null||k.isInstancedMesh&&Me.instancing===!1||!k.isInstancedMesh&&Me.instancing===!0||k.isSkinnedMesh&&Me.skinning===!1||!k.isSkinnedMesh&&Me.skinning===!0||k.isInstancedMesh&&Me.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Me.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Me.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Me.instancingMorph===!1&&k.morphTexture!==null||Me.envMap!==Te||B.fog===!0&&Me.fog!==he||Me.numClippingPlanes!==void 0&&(Me.numClippingPlanes!==Y.numPlanes||Me.numIntersection!==Y.numIntersection)||Me.vertexAlphas!==Oe||Me.vertexTangents!==Ye||Me.morphTargets!==Se||Me.morphNormals!==Ke||Me.morphColors!==vt||Me.morphTargetsCount!==It||Me.numLightProbeGrids!==Tl(A.state.lightProbeGridArray)?je=!0:(Me.outputColorSpace!==ue||Me.toneMapping!==lt)&&(fi=!0):(je=!0,Me.__version=B.version);let Nt=Me.currentProgram;(je===!0||fi===!0)&&(Nt=fi===!0?od(B,P,k,ue,lt):ls(B,P,k),O&&B.isNodeMaterial&&O.onUpdateProgram(B,Nt,Me));let qs=!1,$n=!1,pi=!1;const Je=Nt.getUniforms(),Ct=Me.uniforms;if(fe.useProgram(Nt.program)&&(qs=!0,$n=!0,pi=!0),B.id!==X&&(X=B.id,$n=!0),qs||j!==b){fe.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),Je.setValue(F,"projectionMatrix",b.projectionMatrix),Je.setValue(F,"viewMatrix",b.matrixWorldInverse);const At=Je.map.cameraPosition;At!==void 0&&At.setValue(F,En.setFromMatrixPosition(b.matrixWorld)),ut.logarithmicDepthBuffer&&Je.setValue(F,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&Je.setValue(F,"isOrthographic",b.isOrthographicCamera===!0),j!==b&&(j=b,$n=!0,pi=!0)}if(Me.needsLights&&(zt.state.sunShadowMap.length>0&&Je.setValue(F,"sunShadowMap",zt.state.sunShadowMap,Ne),zt.state.directionalShadowMap.length>0&&Je.setValue(F,"directionalShadowMap",zt.state.directionalShadowMap,Ne),zt.state.spotShadowMap.length>0&&Je.setValue(F,"spotShadowMap",zt.state.spotShadowMap,Ne),zt.state.pointShadowMap.length>0&&Je.setValue(F,"pointShadowMap",zt.state.pointShadowMap,Ne)),k.isSkinnedMesh){Je.setOptional(F,k,"bindMatrix"),Je.setOptional(F,k,"bindMatrixInverse");const ft=k.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),Je.setValue(F,"boneTexture",ft.boneTexture,Ne))}k.isBatchedMesh&&(Je.setOptional(F,k,"batchingTexture"),Je.setValue(F,"batchingTexture",k._matricesTexture,Ne),Je.setOptional(F,k,"batchingIdTexture"),Je.setValue(F,"batchingIdTexture",k._indirectTexture,Ne),Je.setOptional(F,k,"batchingColorTexture"),k._colorsTexture!==null&&Je.setValue(F,"batchingColorTexture",k._colorsTexture,Ne));const gn=G.morphAttributes;if((gn.position!==void 0||gn.normal!==void 0||gn.color!==void 0)&&Z.update(k,G,Nt),($n||Me.receiveShadow!==k.receiveShadow)&&(Me.receiveShadow=k.receiveShadow,Je.setValue(F,"receiveShadow",k.receiveShadow)),(B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial)&&B.envMap===null&&P.environment!==null&&(Ct.envMapIntensity.value=P.environmentIntensity),Ct.dfgLUT!==void 0&&(Ct.dfgLUT.value=ov()),$n){if(Je.setValue(F,"toneMappingExposure",L.toneMappingExposure),Me.needsLights&&cd(Ct,pi),he&&B.fog===!0&&ae.refreshFogUniforms(Ct,he),ae.refreshMaterialUniforms(Ct,B,ve,Le,A.state.transmissionRenderTarget[b.id]),Me.needsLights&&Me.numLightProbeGrids>0){const ft=S;let At=0;for(const Dn of A.state.lightProbeGridArray)Dn.texture!==null&&(ft.textures[At]=Dn.texture,ft.min[At]=Dn.boundingBox.min,ft.max[At]=Dn.boundingBox.max,ft.resolution[At]=Dn.resolution,At++);for(const Dn in ft)ft[Dn].length=At;Ct.probesSH.value=ft.textures,Ct.probesMin.value=ft.min,Ct.probesMax.value=ft.max,Ct.probesResolution.value=ft.resolution}Pr.upload(F,Al(Me),Ct,Ne)}if(B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(Pr.upload(F,Al(Me),Ct,Ne),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&Je.setValue(F,"center",k.center),Je.setValue(F,"modelViewMatrix",k.modelViewMatrix),Je.setValue(F,"normalMatrix",k.normalMatrix),Je.setValue(F,"modelMatrix",k.matrixWorld),B.uniformsGroups!==void 0){const ft=B.uniformsGroups;for(let At=0,Dn=ft.length;At<Dn;At++){const Cl=ft[At];we.update(Cl,Nt),we.bind(Cl,Nt)}}return Nt}function cd(b,P){b.ambientLightColor.needsUpdate=P,b.lightProbe.needsUpdate=P,b.sunLights.needsUpdate=P,b.sunLightShadows.needsUpdate=P,b.directionalLights.needsUpdate=P,b.directionalLightShadows.needsUpdate=P,b.pointLights.needsUpdate=P,b.pointLightShadows.needsUpdate=P,b.spotLights.needsUpdate=P,b.spotLightShadows.needsUpdate=P,b.rectAreaLights.needsUpdate=P,b.hemisphereLights.needsUpdate=P}function ud(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return J},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(b,P,G){const B=Pe.get(b);B.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),Pe.get(b.texture).__webglTexture=P,Pe.get(b.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:G,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,P){const G=Pe.get(b);G.__webglFramebuffer=P,G.__useDefaultFramebuffer=P===void 0},this.setRenderTarget=function(b,P=0,G=0){ne=b,J=P,H=G;let B=null,k=!1,he=!1;if(b){const ue=Pe.get(b);if(ue.__useDefaultFramebuffer!==void 0){fe.bindFramebuffer(F.FRAMEBUFFER,ue.__webglFramebuffer),ee.copy(b.viewport),Ee.copy(b.scissor),Fe=b.scissorTest,fe.viewport(ee),fe.scissor(Ee),fe.setScissorTest(Fe),X=-1;return}else if(ue.__webglFramebuffer===void 0)Ne.setupRenderTarget(b);else if(ue.__hasExternalTextures)Ne.rebindTextures(b,Pe.get(b.texture).__webglTexture,Pe.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Oe=b.depthTexture;if(ue.__boundDepthTexture!==Oe){if(Oe!==null&&Pe.has(Oe)&&(b.width!==Oe.image.width||b.height!==Oe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ne.setupDepthRenderbuffer(b)}}const _e=b.texture;(_e.isData3DTexture||_e.isDataArrayTexture||_e.isCompressedArrayTexture)&&(he=!0);const Te=Pe.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Te[P])?B=Te[P][G]:B=Te[P],k=!0):b.samples>0&&Ne.useMultisampledRTT(b)===!1?B=Pe.get(b).__webglMultisampledFramebuffer:Array.isArray(Te)?B=Te[G]:B=Te,ee.copy(b.viewport),Ee.copy(b.scissor),Fe=b.scissorTest}else ee.copy(Ie).multiplyScalar(ve).floor(),Ee.copy(st).multiplyScalar(ve).floor(),Fe=at;if(G!==0&&(B=q),fe.bindFramebuffer(F.FRAMEBUFFER,B)&&fe.drawBuffers(b,B),fe.viewport(ee),fe.scissor(Ee),fe.setScissorTest(Fe),k){const ue=Pe.get(b.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+P,ue.__webglTexture,G)}else if(he){const ue=P;for(let _e=0;_e<b.textures.length;_e++){const Te=Pe.get(b.textures[_e]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+_e,Te.__webglTexture,G,ue)}}else if(b!==null&&G!==0){const ue=Pe.get(b.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ue.__webglTexture,G)}X=-1};function Rl(b){const P=Pe.get(b);return(P.__readFormat!==b.format||P.__readType!==b.type)&&(P.__readFormat=b.format,P.__readType=b.type,P.__formatReadable=ut.textureFormatReadable(b.format),P.__typeReadable=ut.textureTypeReadable(b.type)),P}this.readRenderTargetPixels=function(b,P,G,B,k,he,ye,ue=0){if(!(b&&b.isWebGLRenderTarget)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _e=Pe.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ye!==void 0&&(_e=_e[ye],Array.isArray(_e)&&(_e=_e[0])),_e){fe.bindFramebuffer(F.FRAMEBUFFER,_e);try{const Te=b.textures[ue],Oe=Te.format,Ye=Te.type;b.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+ue);const Se=Rl(Te);if(Se.__formatReadable===!1){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Se.__typeReadable===!1){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=b.width-B&&G>=0&&G<=b.height-k&&F.readPixels(P,G,B,k,se.convert(Oe),se.convert(Ye),he)}finally{const Te=ne!==null?Pe.get(ne).__webglFramebuffer:null;fe.bindFramebuffer(F.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(b,P,G,B,k,he,ye,ue=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _e=Pe.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ye!==void 0&&(_e=_e[ye],Array.isArray(_e)&&(_e=_e[0])),_e)if(P>=0&&P<=b.width-B&&G>=0&&G<=b.height-k){fe.bindFramebuffer(F.FRAMEBUFFER,_e);const Te=b.textures[ue],Oe=Te.format,Ye=Te.type;b.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+ue);const Se=Rl(Te);if(Se.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Se.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ke=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Ke),F.bufferData(F.PIXEL_PACK_BUFFER,he.byteLength,F.STREAM_READ),F.readPixels(P,G,B,k,se.convert(Oe),se.convert(Ye),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);const vt=ne!==null?Pe.get(ne).__webglFramebuffer:null;fe.bindFramebuffer(F.FRAMEBUFFER,vt);const lt=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Wd(F,lt,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Ke),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,he),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(Ke),F.deleteSync(lt),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,P=null,G=0){const B=Math.pow(2,-G),k=Math.floor(b.image.width*B),he=Math.floor(b.image.height*B),ye=P!==null?P.x:0,ue=P!==null?P.y:0;Ne.setTexture2D(b,0),F.copyTexSubImage2D(F.TEXTURE_2D,G,0,0,ye,ue,k,he),fe.unbindTexture()},this.copyTextureToTexture=function(b,P,G=null,B=null,k=0,he=0){let ye,ue,_e,Te,Oe,Ye,Se,Ke,vt;const lt=b.isCompressedTexture?b.mipmaps[he]:b.image;if(G!==null)ye=G.max.x-G.min.x,ue=G.max.y-G.min.y,_e=G.isBox3?G.max.z-G.min.z:1,Te=G.min.x,Oe=G.min.y,Ye=G.isBox3?G.min.z:0;else{const Je=Math.pow(2,-k);ye=Math.floor(lt.width*Je),ue=Math.floor(lt.height*Je),b.isDataArrayTexture?_e=lt.depth:b.isData3DTexture?_e=Math.floor(lt.depth*Je):_e=1,Te=0,Oe=0,Ye=0}B!==null?(Se=B.x,Ke=B.y,vt=B.z):(Se=0,Ke=0,vt=0);const ot=se.convert(P.format),It=se.convert(P.type);let Me;P.isData3DTexture?(Ne.setTexture3D(P,0),Me=F.TEXTURE_3D):P.isDataArrayTexture||P.isCompressedArrayTexture?(Ne.setTexture2DArray(P,0),Me=F.TEXTURE_2D_ARRAY):(Ne.setTexture2D(P,0),Me=F.TEXTURE_2D),fe.activeTexture(F.TEXTURE0),fe.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,P.flipY),fe.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),fe.pixelStorei(F.UNPACK_ALIGNMENT,P.unpackAlignment);const zt=fe.getParameter(F.UNPACK_ROW_LENGTH),je=fe.getParameter(F.UNPACK_IMAGE_HEIGHT),fi=fe.getParameter(F.UNPACK_SKIP_PIXELS),Nt=fe.getParameter(F.UNPACK_SKIP_ROWS),qs=fe.getParameter(F.UNPACK_SKIP_IMAGES);fe.pixelStorei(F.UNPACK_ROW_LENGTH,lt.width),fe.pixelStorei(F.UNPACK_IMAGE_HEIGHT,lt.height),fe.pixelStorei(F.UNPACK_SKIP_PIXELS,Te),fe.pixelStorei(F.UNPACK_SKIP_ROWS,Oe),fe.pixelStorei(F.UNPACK_SKIP_IMAGES,Ye);const $n=b.isDataArrayTexture||b.isData3DTexture,pi=P.isDataArrayTexture||P.isData3DTexture;if(b.isDepthTexture){const Je=Pe.get(b),Ct=Pe.get(P),gn=Pe.get(Je.__renderTarget),ft=Pe.get(Ct.__renderTarget);fe.bindFramebuffer(F.READ_FRAMEBUFFER,gn.__webglFramebuffer),fe.bindFramebuffer(F.DRAW_FRAMEBUFFER,ft.__webglFramebuffer);for(let At=0;At<_e;At++)$n&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Pe.get(b).__webglTexture,k,Ye+At),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Pe.get(P).__webglTexture,he,vt+At)),F.blitFramebuffer(Te,Oe,Te+ye,Oe+ue,Se,Ke,Se+ye,Ke+ue,F.DEPTH_BUFFER_BIT,F.NEAREST);fe.bindFramebuffer(F.READ_FRAMEBUFFER,null),fe.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(k!==0||b.isRenderTargetTexture||Pe.has(b)){const Je=Pe.get(b),Ct=Pe.get(P);fe.bindFramebuffer(F.READ_FRAMEBUFFER,D),fe.bindFramebuffer(F.DRAW_FRAMEBUFFER,V);for(let gn=0;gn<_e;gn++)$n?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Je.__webglTexture,k,Ye+gn):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Je.__webglTexture,k),pi?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ct.__webglTexture,he,vt+gn):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ct.__webglTexture,he),k!==0?F.blitFramebuffer(Te,Oe,Te+ye,Oe+ue,Se,Ke,Se+ye,Ke+ue,F.COLOR_BUFFER_BIT,F.NEAREST):pi?F.copyTexSubImage3D(Me,he,Se,Ke,vt+gn,Te,Oe,ye,ue):F.copyTexSubImage2D(Me,he,Se,Ke,Te,Oe,ye,ue);fe.bindFramebuffer(F.READ_FRAMEBUFFER,null),fe.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else pi?b.isDataTexture||b.isData3DTexture?F.texSubImage3D(Me,he,Se,Ke,vt,ye,ue,_e,ot,It,lt.data):P.isCompressedArrayTexture?F.compressedTexSubImage3D(Me,he,Se,Ke,vt,ye,ue,_e,ot,lt.data):F.texSubImage3D(Me,he,Se,Ke,vt,ye,ue,_e,ot,It,lt):b.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,he,Se,Ke,ye,ue,ot,It,lt.data):b.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,he,Se,Ke,lt.width,lt.height,ot,lt.data):F.texSubImage2D(F.TEXTURE_2D,he,Se,Ke,ye,ue,ot,It,lt);fe.pixelStorei(F.UNPACK_ROW_LENGTH,zt),fe.pixelStorei(F.UNPACK_IMAGE_HEIGHT,je),fe.pixelStorei(F.UNPACK_SKIP_PIXELS,fi),fe.pixelStorei(F.UNPACK_SKIP_ROWS,Nt),fe.pixelStorei(F.UNPACK_SKIP_IMAGES,qs),he===0&&P.generateMipmaps===!0&&P.mipmapsAutoUpdate===!0&&F.generateMipmap(Me),fe.unbindTexture()},this.initRenderTarget=function(b){Pe.get(b).__webglFramebuffer===void 0&&Ne.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Ne.setTextureCube(b,0):b.isData3DTexture?Ne.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Ne.setTexture2DArray(b,0):Ne.setTexture2D(b,0),fe.unbindTexture()},this.resetState=function(){J=0,H=0,ne=null,fe.reset(),oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ze._getUnpackColorSpace()}}const zc={type:"change"},ll={type:"start"},Gu={type:"end"},yr=new zs,kc=new wn,cv=Math.cos(70*Qo.DEG2RAD),bt=new w,$t=2*Math.PI,et={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ha=1e-6;class uv extends pf{constructor(e,t=null){super(e,t),this.state=et.NONE,this.target=new w,this.cursor=new w,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Zi.ROTATE,MIDDLE:Zi.DOLLY,RIGHT:Zi.PAN},this.touches={ONE:Yi.ROTATE,TWO:Yi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new w,this._lastQuaternion=new si,this._lastTargetPosition=new w,this._quat=new si().setFromUnitVectors(e.up,new w(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new gc,this._sphericalDelta=new gc,this._scale=1,this._panOffset=new w,this._rotateStart=new re,this._rotateEnd=new re,this._rotateDelta=new re,this._panStart=new re,this._panEnd=new re,this._panDelta=new re,this._dollyStart=new re,this._dollyEnd=new re,this._dollyDelta=new re,this._dollyDirection=new w,this._mouse=new re,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=hv.bind(this),this._onPointerDown=dv.bind(this),this._onPointerUp=fv.bind(this),this._onContextMenu=yv.bind(this),this._onMouseWheel=gv.bind(this),this._onKeyDown=vv.bind(this),this._onTouchStart=_v.bind(this),this._onTouchMove=xv.bind(this),this._onMouseDown=pv.bind(this),this._onMouseMove=mv.bind(this),this._interceptControlDown=bv.bind(this),this._interceptControlUp=Sv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=et.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(zc),this.update(),this.state=et.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;bt.copy(t).sub(this.target),bt.applyQuaternion(this._quat),this._spherical.setFromVector3(bt),this.autoRotate&&this.state===et.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=$t:n>Math.PI&&(n-=$t),s<-Math.PI?s+=$t:s>Math.PI&&(s-=$t),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(bt.setFromSpherical(this._spherical),bt.applyQuaternion(this._quatInverse),t.copy(this.target).add(bt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=bt.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const o=new w(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new w(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=bt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(yr.origin.copy(this.object.position),yr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(yr.direction))<cv?this.object.lookAt(this.target):(kc.setFromNormalAndCoplanarPoint(this.object.up,this.target),yr.intersectPlane(kc,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ha||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ha||this._lastTargetPosition.distanceToSquared(this.target)>Ha?(this.dispatchEvent(zc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?$t/60*this.autoRotateSpeed*e:$t/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){bt.setFromMatrixColumn(t,0),bt.multiplyScalar(-e),this._panOffset.add(bt)}_panUp(e,t){this.screenSpacePanning===!0?bt.setFromMatrixColumn(t,1):(bt.setFromMatrixColumn(t,0),bt.crossVectors(this.object.up,bt)),bt.multiplyScalar(e),this._panOffset.add(bt)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;bt.copy(s).sub(this.target);let r=bt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientY),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft($t*this._rotateDelta.x/t.clientHeight),this._rotateUp($t*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp($t*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-$t*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft($t*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-$t*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft($t*this._rotateDelta.x/t.clientHeight),this._rotateUp($t*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new re,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function dv(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function hv(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function fv(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Gu),this.state=et.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function pv(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Zi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=et.DOLLY;break;case Zi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=et.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=et.ROTATE}break;case Zi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=et.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=et.PAN}break;default:this.state=et.NONE}this.state!==et.NONE&&this.dispatchEvent(ll)}function mv(i){switch(this.state){case et.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case et.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case et.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function gv(i){this.enabled===!1||this.enableZoom===!1||this.state!==et.NONE||(i.preventDefault(),this.dispatchEvent(ll),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Gu))}function vv(i){this.enabled!==!1&&this._handleKeyDown(i)}function _v(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Yi.ROTATE:if(this.enableRotate===!1){this.state=et.NONE;break}this._handleTouchStartRotate(i),this.state=et.TOUCH_ROTATE;break;case Yi.PAN:if(this.enablePan===!1){this.state=et.NONE;break}this._handleTouchStartPan(i),this.state=et.TOUCH_PAN;break;default:this.state=et.NONE}break;case 2:switch(this.touches.TWO){case Yi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=et.TOUCH_DOLLY_PAN;break;case Yi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=et.TOUCH_DOLLY_ROTATE;break;default:this.state=et.NONE}break;default:this.state=et.NONE}this.state!==et.NONE&&this.dispatchEvent(ll)}function xv(i){switch(this._trackPointer(i),this.state){case et.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case et.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case et.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case et.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=et.NONE}}function yv(i){this.enabled!==!1&&i.preventDefault()}function bv(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Sv(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class Mv extends mt{constructor(e=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new re(.5,.5),this.rotation2D=0,this.addEventListener("removed",function(){this.traverse(function(t){t.element&&t.element instanceof t.element.ownerDocument.defaultView.Element&&t.element.parentNode!==null&&t.element.remove()})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this.rotation2D=e.rotation2D,this}}const Wi=new w,Hc=new it,Gc=new it,Vc=new w,qc=new w;class Ev{constructor(e={}){const t=this;let n,s,r,a;const o={objects:new WeakMap},c=e.element!==void 0?e.element:document.createElement("div");c.style.overflow="hidden",this.domElement=c,this.sortObjects=!0,this.getSize=function(){return{width:n,height:s}},this.render=function(m,_){m.matrixWorldAutoUpdate===!0&&m.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),Hc.copy(_.matrixWorldInverse),Gc.multiplyMatrices(_.projectionMatrix,Hc),d(m,m,_),this.sortObjects&&h(m)},this.setSize=function(m,_){n=m,s=_,r=n/2,a=s/2,c.style.width=m+"px",c.style.height=_+"px"};function l(m){m.isCSS2DObject&&(m.element.style.display="none");for(let _=0,g=m.children.length;_<g;_++)l(m.children[_])}function d(m,_,g){if(m.visible===!1){l(m);return}if(m.isCSS2DObject){Wi.setFromMatrixPosition(m.matrixWorld),Wi.applyMatrix4(Gc);const p=Wi.z>=-1&&Wi.z<=1&&m.layers.test(g.layers)===!0,y=m.element;if(y.style.display=p===!0?"":"none",p===!0){m.onBeforeRender(t,_,g);const S=100*m.center.x,R=100*m.center.y;y.style.transformOrigin=`${S}% ${R}%`;const A=-m.rotation2D,v=Wi.x*r+r,M=-Wi.y*a+a;y.style.transform=`translate(${-S}%, ${-R}%) translate(${v}px, ${M}px) rotate(${A}rad)`,y.parentNode!==c&&c.appendChild(y),m.onAfterRender(t,_,g)}const E={distanceToCameraSquared:f(g,m)};o.objects.set(m,E)}for(let p=0,y=m.children.length;p<y;p++)d(m.children[p],_,g)}function f(m,_){return Vc.setFromMatrixPosition(m.matrixWorld),qc.setFromMatrixPosition(_.matrixWorld),Vc.distanceToSquared(qc)}function u(m){const _=[];return m.traverseVisible(function(g){g.isCSS2DObject&&_.push(g)}),_}function h(m){const _=u(m).sort(function(p,y){if(p.renderOrder!==y.renderOrder)return y.renderOrder-p.renderOrder;const E=o.objects.get(p).distanceToCameraSquared,S=o.objects.get(y).distanceToCameraSquared;return E-S}),g=_.length;for(let p=0,y=_.length;p<y;p++)_[p].element.style.zIndex=g-p}}}const Dr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class os{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Tv=new al(-1,1,1,-1,0,1);class Av extends dt{constructor(){super(),this.setAttribute("position",new Xe([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Xe([0,2,0,0,2,0],2))}}const wv=new Av;class cl{constructor(e){this._mesh=new We(wv,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Tv)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Rv extends os{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Qt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Os.clone(e.uniforms),this.material=new Qt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new cl(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Wc extends os{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class Cv extends os{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Lv{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new re);this._width=n.width,this._height=n.height,t=new en(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:jt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Rv(Dr),this.copyPass.material.blending=Si,this.timer=new cf}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){const o=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Wc!==void 0&&(a instanceof Wc?n=!0:a instanceof Cv&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new re);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Pv extends os{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ae}render(e,t,n){const s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}}const Dv={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ae(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class is extends os{constructor(e,t=1,n,s){super(),this.strength=t,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new re(e.x,e.y):new re(256,256),this.clearColor=new Ae(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new en(r,a,{type:jt,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const f=new en(r,a,{type:jt,depthBuffer:!1});f.texture.name="UnrealBloomPass.h"+d,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const u=new en(r,a,{type:jt,depthBuffer:!1});u.texture.name="UnrealBloomPass.v"+d,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),r=Math.round(r/2),a=Math.round(a/2)}const o=Dv;this.highPassUniforms=Os.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Qt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new re(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new w(1,1,1),new w(1,1,1),new w(1,1,1),new w(1,1,1),new w(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Os.clone(Dr.uniforms),this.blendMaterial=new Qt({uniforms:this.copyUniforms,vertexShader:Dr.vertexShader,fragmentShader:Dr.fragmentShader,premultipliedAlpha:!0,blending:Gt,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ae,this._oldClearAlpha=1,this._basic=new hn,this._fsQuad=new cl(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new re(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[c].uniforms.direction.value=is.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=is.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){const t=[],n=e/3;for(let a=0;a<e;a++)t.push(.39894*Math.exp(-.5*a*a/(n*n))/n);const s=[],r=[];for(let a=1;a<e;a+=2){const o=t[a],c=a+1<e?t[a+1]:0,l=o+c;s.push((a*o+(a+1)*c)/l),r.push(l)}return new Qt({defines:{KERNEL_PAIRS:s.length},uniforms:{colorTexture:{value:null},invSize:{value:new re(.5,.5)},direction:{value:new re(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:s},gaussianWeights:{value:r}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new Qt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}is.BlurDirectionX=new re(1,0);is.BlurDirectionY=new re(0,1);const br={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class Iv extends os{constructor(){super(),this.isOutputPass=!0,this.uniforms=Os.clone(br.uniforms),this.material=new Ru({name:br.name,uniforms:this.uniforms,vertexShader:br.vertexShader,fragmentShader:br.fragmentShader}),this._fsQuad=new cl(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ze.getTransfer(this._outputColorSpace)===nt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Oo?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Bo?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===zo?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Wr?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Ho?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Go?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===ko&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const Vu=[{id:"cerveau",kind:"organ",name:"Cerveau",latin:"Encephalon",system:"nerveux",color:"#e09bb8",region:"Boîte crânienne",description:"Chef d'orchestre du corps, le cerveau traite les sens, la mémoire, les émotions et les mouvements. Ses deux hémisphères communiquent par le corps calleux.",function:"Reçoit et interprète les informations sensorielles, décide, commande les muscles, régule les fonctions vitales avec l'hypothalamus et le tronc cérébral.",funFact:"Il représente environ 2 % du poids du corps mais consomme près de 20 % de l'oxygène et du glucose que nous utilisons."},{id:"cervelet",kind:"organ",name:"Cervelet",latin:"Cerebellum",system:"nerveux",color:"#c97f9e",region:"Arrière du crâne",description:"Petit cerveau bosselé situé sous les hémisphères, le cervelet ajuste la précision des gestes et stabilise le regard.",function:"Coordonne les mouvements volontaires, l'équilibre, la posture et l'apprentissage moteur — comme faire du vélo.",funFact:"Bien plus petit que le cerveau, il contient pourtant la majorité des neurones de l'encéphale, environ 69 milliards."},{id:"tronc_cerebral",kind:"organ",name:"Tronc cérébral",latin:"Truncus encephali",system:"nerveux",color:"#b06a8a",region:"Base du crâne",description:"Pont entre le cerveau et la moelle épinière, il abrite des centres vitaux indispensables et le passage de tous les grands faisceaux nerveux.",function:"Contrôle automatiquement la respiration, le rythme cardiaque, la déglutition, la vigilance et le sommeil.",funFact:"Une lésion très localisée du tronc cérébral peut être mortelle car les centres respiratoires y sont concentrés."},{id:"moelle_epiniere",kind:"organ",name:"Moelle épinière",latin:"Medulla spinalis",system:"nerveux",color:"#f4d06f",region:"Dos, dans la colonne",description:"Long cordon nerveux logé dans le canal vertébral, la moelle épinière transmet les messages entre le cerveau et le reste du corps.",function:"Conduit les informations motrices et sensorielles, et organise des réflexes rapides sans passer par le cerveau.",funFact:"Elle mesure environ 45 cm et s'arrête vers la première ou deuxième vertèbre lombaire, bien avant la fin de la colonne."},{id:"coeur",kind:"organ",name:"Cœur",latin:"Cor",system:"cardiovasculaire",color:"#d6455d",region:"Thorax, à gauche",description:"Pompe musculaire de la taille d'un poing, le cœur possède quatre cavités : deux oreillettes en haut, deux ventricules en bas.",function:"Propulse le sang oxygéné dans l'aorte vers les organes et envoie le sang veineux vers les poumons pour qu'il soit réoxygéné.",funFact:"Il bat environ 100 000 fois par jour à 70 bpm, soit près de 2,5 milliards de battements au cours d'une vie."},{id:"coronaires",kind:"organ",name:"Artères coronaires",latin:"Arteriae coronariae",system:"cardiovasculaire",color:"#ff7b8a",region:"Surface du cœur",description:"Deux fines artères et leurs branches descendent de l'aorte pour irriguer le muscle cardiaque lui-même.",function:"Apportent l'oxygène et les nutriments au myocarde, qui ne peut pas s'arrêter de travailler.",funFact:"Le cœur ne consomme que 5 % du sang qu'il éjecte, mais il extrait jusqu'à 70 % de l'oxygène de ce sang."},{id:"aorte",kind:"organ",name:"Aorte",latin:"Aorta",system:"cardiovasculaire",color:"#c0392b",region:"Thorax et abdomen",description:"La plus grande artère du corps quitte le ventricule gauche en formant une crosse, puis descend le long de la colonne jusqu'à l'abdomen.",function:"Distribue le sang oxygéné à toutes les régions du corps, dont le cerveau, les reins et les jambes.",funFact:"Son diamètre atteint 2,5 à 3 cm chez l'adulte ; sa paroi élastique amortit chaque jet de sang du cœur."},{id:"poumons",kind:"organ",name:"Poumons",latin:"Pulmones",system:"respiratoire",color:"#e58a95",region:"Thorax",description:"Deux organes spongieux, le droit en trois lobes et le gauche en deux, autour du cœur. Ils contiennent des centaines de millions d'alvéoles.",function:"Échangent les gaz : l'oxygène entre dans le sang et le dioxyde de carbone est expiré.",funFact:"Dépliée, la surface d'échange des alvéoles atteindrait 70 m², soit environ la moitié d'un court de tennis."},{id:"bronches",kind:"organ",name:"Voies aériennes",latin:"Trachea et bronchi",system:"respiratoire",color:"#e8a0ac",region:"Cou et thorax",description:"La trachée, renforcée d'anneaux de cartilage, se divise en deux bronches principales puis en un arbre de bronchioles de plus en plus fines.",function:"Conduit l'air jusqu'aux alvéoles, réchauffe et humidifie l'air, et piège les poussières grâce au mucus et aux cils.",funFact:"L'arbre bronchique compte environ 23 niveaux de division ; les bronchioles terminales sont plus fines qu'un cheveu."},{id:"oesophage",kind:"organ",name:"Œsophage",latin:"Oesophagus",system:"digestif",color:"#cf8b72",region:"Cou et thorax",description:"Conduit musculeux d'environ 25 cm, l'œsophage traverse le thorax derrière la trachée pour rejoindre l'estomac.",function:"Fait progresser les aliments par des ondes de contraction, le péristaltisme, et empêche le reflux grâce à deux sphincters.",funFact:"Il peut propulser un bol alimentaire en quelques secondes, même la tête en bas, grâce à ses contractions."},{id:"estomac",kind:"organ",name:"Estomac",latin:"Gaster",system:"digestif",color:"#c98b6b",region:"Abdomen supérieur gauche",description:"Poche musculeuse en forme de J, l'estomac brasse les aliments et sécrète un acide très puissant.",function:"Stocke temporairement les aliments, les réduit en bouillie (chyme) grâce aux sucs gastriques et commence la digestion des protéines.",funFact:"Son pH peut descendre autour de 1,5 : assez acide pour dissoudre du métal, mais sa muqueuse se renouvelle en permanence."},{id:"foie",kind:"organ",name:"Foie",latin:"Hepar",system:"digestif",color:"#94483c",region:"Abdomen supérieur droit",description:"Le plus gros organe interne, brun-rouge, occupe la partie droite de l'abdomen sous les côtes. Il est organisé en lobules et en canaux biliaires.",function:"Filtre le sang, stocke le glycogène et les vitamines, transforme les toxines, fabrique l'albumine et la bile.",funFact:"Le foie assure plus de 500 fonctions et peut se régénérer : on peut retirer jusqu'à 70 % de son volume, il repousse."},{id:"vesicule",kind:"organ",name:"Vésicule biliaire",latin:"Vesica biliaris",system:"digestif",color:"#6fae6a",region:"Sous le foie",description:"Petit sac vert en forme de poire, collé sous le foie, la vésicule concentre la bile produite par celui-ci.",function:"Stocke la bile et la libère dans l'intestin après un repas gras pour aider à digérer les lipides.",funFact:"Elle peut contenir 30 à 50 ml de bile. On peut vivre normalement sans elle : la bile s'écoule alors en continu dans l'intestin."},{id:"pancreas",kind:"organ",name:"Pancréas",latin:"Pancreas",system:"digestif",color:"#d9b06a",region:"Derrière l'estomac",description:"Glande allongée et feuilletée, le pancréas est à la fois digestif et hormonal. Sa tête est logée dans la courbure du duodénum.",function:"Libère des enzymes digestives dans l'intestin et sécrète l'insuline et le glucagon pour réguler la glycémie.",funFact:"Seule une petite partie de son volume, les îlots de Langerhans, produit l'insuline — mais leur rôle est vital."},{id:"intestin_grele",kind:"organ",name:"Intestin grêle",latin:"Intestinum tenue",system:"digestif",color:"#e08f8a",region:"Abdomen central",description:"Long tube de 6 à 7 m enroulé au centre de l'abdomen, composé du duodénum, du jéjunum et de l'iléon.",function:"Achève la digestion et absorbe l'essentiel des nutriments grâce à ses villosités et microvillosités.",funFact:"Ses replis augmentent la surface d'absorption à environ 30 m², soit la taille d'un studio parisien."},{id:"colon",kind:"organ",name:"Côlon",latin:"Colon",system:"digestif",color:"#b98062",region:"Cadre de l'abdomen",description:"Le gros intestin, long d'environ 1,5 m, encadre l'intestin grêle : côlon ascendant à droite, transverse, descendant à gauche puis sigmoïde.",function:"Absorbe l'eau et les électrolytes, héberge le microbiote et forme les selles avant le rectum.",funFact:"Le côlon abrite des dizaines de milliers de milliards de bactéries, soit à peu près autant de cellules que notre corps."},{id:"reins",kind:"organ",name:"Reins",latin:"Renes",system:"urinaire",color:"#8e3b46",region:"Arrière de l'abdomen",description:"Deux organes en forme de haricot, positionnés de part et d'autre de la colonne, derrière le péritoine.",function:"Filtrent le sang, éliminent les déchets dans l'urine, équilibrent l'eau et les sels, régulent la tension et fabriquent l'érythropoïétine.",funFact:"Chaque rein contient environ 1 million de néphrons et filtre près de 180 litres de liquide par jour… pour 1,5 L d'urine."},{id:"ureteres",kind:"organ",name:"Uretères",latin:"Ureteres",system:"urinaire",color:"#c9a27a",region:"Abdomen et bassin",description:"Deux fins tubes de 25 à 30 cm relient le bassinet de chaque rein à la vessie.",function:"Transportent l'urine par péristaltisme vers la vessie, sans clapet : la pression et l'orientation préviennent le reflux.",funFact:"Un uretère peut se bloquer par un calcul de quelques millimètres, provoquant une douleur rénale intense, la colique néphrétique."},{id:"vessie",kind:"organ",name:"Vessie",latin:"Vesica urinaria",system:"urinaire",color:"#d8c47a",region:"Bassin",description:"Réservoir musculeux extensible situé derrière le pubis, la vessie stocke l'urine grâce à son muscle détrusor.",function:"Stocke l'urine jusqu'à 300 à 500 ml et l'évacue lors de la miction, sous contrôle nerveux volontaire.",funFact:"Elle peut se distendre et remonter dans l'abdomen lorsqu'elle est pleine ; ses capteurs envoient alors le besoin d'uriner."},{id:"rate",kind:"organ",name:"Rate",latin:"Splen",system:"immunitaire",color:"#7b4e86",region:"Abdomen supérieur gauche",description:"Organe violet en forme de poing, la rate est le plus gros organe lymphoïde du corps, cachée sous les côtes gauches.",function:"Filtre le sang, détruit les globules rouges usés, stocke des plaquettes et participe à la défense immunitaire.",funFact:"On peut vivre sans rate, mais le risque d'infections graves augmente : les vaccins sont alors particulièrement importants."},{id:"thyroide",kind:"organ",name:"Thyroïde",latin:"Glandula thyroidea",system:"endocrinien",color:"#d98f4a",region:"Base du cou",description:"Glande en forme de papillon posée sur la trachée, la thyroïde produit les hormones T3 et T4 à partir de l'iode alimentaire.",function:"Régule le métabolisme de base, la température, le rythme cardiaque, la croissance et le développement.",funFact:"Elle ne pèse que 20 à 30 g, mais ses hormones influencent chaque cellule du corps, du cerveau au tissu graisseux."},{id:"surrenales",kind:"organ",name:"Glandes surrénales",latin:"Glandulae suprarenales",system:"endocrinien",color:"#d9a441",region:"Au-dessus des reins",description:"Deux petites glandes coiffant les reins, chacune composée d'une corticosurrénale et d'une médullosurrénale.",function:"Produisent le cortisol (stress, métabolisme), l'aldostérone (sels et tension) et l'adrénaline (alerte, fuite).",funFact:"L'adrénaline libérée en une fraction de seconde peut doubler le débit cardiaque et décupler la force musculaire."}];Object.fromEntries(Vu.map(i=>[i.id,i]));const Nv=[{id:"crane",kind:"bone",name:"Crâne",latin:"Cranium",system:"squelettique",color:"#e9e2cf",region:"Tête",description:"Le crâne réunit 22 os soudés par des sutures, dont 8 forment la boîte crânienne qui protège le cerveau.",role:"Protège l'encéphale et les organes des sens, soutient le visage et abrite les sinus.",funFact:"Les os du crâne d'un nouveau-né ne sont pas totalement fusionnés : les fontanelles permettent la croissance du cerveau."},{id:"colonne",kind:"bone",name:"Colonne vertébrale",latin:"Columna vertebralis",system:"squelettique",color:"#e9e2cf",region:"Dos",description:"Empilement de 33 vertèbres (7 cervicales, 12 thoraciques, 5 lombaires, 5 sacrées, 4 coccygiennes), séparées par des disques.",role:"Soutient la tête et le tronc, protège la moelle épinière et permet de se pencher, tourner et fléchir.",funFact:"Vue de côté, la colonne dessine un S : ces courbures naturelles amortissent les chocs comme un ressort."},{id:"cotes",kind:"bone",name:"Côtes & sternum",latin:"Costae et sternum",system:"squelettique",color:"#e9e2cf",region:"Thorax",description:"Douze paires de côtes s'articulent à la colonne, les dix premières rejoignent le sternum par des cartilages.",role:"Forment une cage élastique qui protège le cœur, les poumons et les gros vaisseaux, et participent à la respiration.",funFact:"Les côtes bougent à chaque respiration : elles se soulèvent comme les anses d'un seau, augmentant le volume du thorax."},{id:"bassin",kind:"bone",name:"Bassin",latin:"Pelvis",system:"squelettique",color:"#e9e2cf",region:"Bassin",description:"Anneau osseux formé par les deux os iliaques, le sacrum et le coccyx, il relie la colonne aux membres inférieurs.",role:"Transmet le poids du corps aux jambes, protège la vessie et les organes pelviens, sert d'ancrage aux muscles.",funFact:"Le bassin féminin est plus large et plus bas que le masculin, une adaptation à l'accouchement."},{id:"omoplate",kind:"bone",name:"Omoplate",latin:"Scapula",system:"squelettique",color:"#e9e2cf",region:"Haut du dos",description:"Os plat et triangulaire, l'omoplate glisse sur le gril costal à l'arrière de chaque épaule.",role:"Offre une grande surface d'insertion aux muscles de l'épaule et forme, avec la clavicule, l'articulation de l'épaule.",funFact:"L'omoplate est très mobile : elle suit les mouvements du bras et permet de lever le membre au-dessus de la tête."},{id:"clavicule",kind:"bone",name:"Clavicule",latin:"Clavicula",system:"squelettique",color:"#e9e2cf",region:"Haut du thorax",description:"Os allongé en forme de S, horizontal, entre le sternum et l'omoplate. C'est l'os le plus souvent fracturé chez l'enfant.",role:"Maintient l'épaule écartée du thorax et transmet les forces du bras au squelette axial.",funFact:"La clavicule est le premier os à commencer son ossification chez l'embryon, dès la 5e semaine."},{id:"humerus",kind:"bone",name:"Humérus",latin:"Humerus",system:"squelettique",color:"#e9e2cf",region:"Bras",description:"Os long du bras, articulé à l'omoplate en haut et au radius/ulna en bas.",role:"Sert de levier pour les muscles de l'épaule et du bras ; son extrémité inférieure forme la charnière du coude.",funFact:"Le « petit juif » que l'on cogne au coude est en réalité le nerf ulnaire, qui passe dans une gouttière de l'humérus."},{id:"avant_bras",kind:"bone",name:"Radius & ulna",latin:"Radius et ulna",system:"squelettique",color:"#e9e2cf",region:"Avant-bras",description:"Deux os parallèles de l'avant-bras. Le radius est du côté du pouce, l'ulna (cubitus) du côté du petit doigt.",role:"Permettent la flexion du coude et surtout la rotation de l'avant-bras, qui retourne la paume vers le haut ou le bas.",funFact:"Quand vous tournez la main, le radius pivote autour de l'ulna : c'est la prono-supination."},{id:"main",kind:"bone",name:"Main",latin:"Manus",system:"squelettique",color:"#e9e2cf",region:"Membre supérieur",description:"La main compte 27 os : 8 du carpe, 5 métacarpiens et 14 phalanges, plus des dizaines de ligaments et tendons.",role:"Permet la préhension fine, le toucher et la manipulation d'objets avec une précision extrême.",funFact:"La main a une densité de récepteurs tactiles si élevée que le cortex lui consacre une zone disproportionnée."},{id:"femur",kind:"bone",name:"Fémur",latin:"Femur",system:"squelettique",color:"#e9e2cf",region:"Cuisse",description:"Le plus long et le plus solide des os, il s'articule avec le bassin par la hanche et avec le tibia par le genou.",role:"Transmet le poids du corps et sert de levier puissant pour la marche, la course et le saut.",funFact:"Il peut supporter 30 fois le poids du corps en compression ; sa fracture est pourtant fréquente après 65 ans."},{id:"rotule",kind:"bone",name:"Rotule",latin:"Patella",system:"squelettique",color:"#e9e2cf",region:"Genou",description:"Petit os sésamoïde aplati, la rotule est enchâssée dans le tendon du quadriceps, devant le genou.",role:"Protège l'articulation du genou et augmente l'efficacité du muscle quadriceps en agissant comme une poulie.",funFact:"La rotule est le plus gros os sésamoïde du corps ; elle n'est pas présente à la naissance, elle ossifie vers 3 ans."},{id:"tibia",kind:"bone",name:"Tibia & péroné",latin:"Tibia et fibula",system:"squelettique",color:"#e9e2cf",region:"Jambe",description:"Le tibia est l'os porteur de la jambe ; le péroné (fibula), plus fin, est latéral et sert d'insertion musculaire.",role:"Soutiennent le poids du corps et forment la cheville avec le talus ; le tibia est le deuxième os le plus long.",funFact:"Le tibia est très exposé : sa face antérieure est juste sous la peau, d'où les douleurs du « périoste » chez les coureurs."},{id:"pied",kind:"bone",name:"Pied",latin:"Pes",system:"squelettique",color:"#e9e2cf",region:"Membre inférieur",description:"Le pied compte 26 os, 33 articulations et une vingtaine de muscles intrinsèques, organisés en voûte.",role:"Supporte le poids, amortit les impacts et propulse le corps lors de la marche.",funFact:"La voûte plantaire répartit les charges comme un arc de pont ; à chaque pas, le pied encaisse plusieurs fois le poids du corps."}],Uv=[{id:"trapezes",kind:"muscle",name:"Trapèzes",latin:"Musculus trapezius",system:"musculaire",color:"#b83a4b",region:"Nuque et haut du dos",description:"Grand muscle triangulaire qui relie la nuque aux épaules et descend le long du dos, en forme de cerf-volant.",role:"Élève, abaisse et rapproche les omoplates ; aide à incliner et tourner la tête. Il est souvent contracté par le stress.",funFact:"Le trapèze est l'un des rares muscles à être innervé par trois nerfs différents."},{id:"deltoides",kind:"muscle",name:"Deltoïdes",latin:"Musculus deltoideus",system:"musculaire",color:"#c4454f",region:"Épaules",description:"Muscle arrondi coiffant l'épaule, le deltoïde possède trois faisceaux : antérieur, moyen et postérieur.",role:"Lève le bras sur le côté, vers l'avant et vers l'arrière ; stabilise l'articulation de l'épaule.",funFact:"Son nom vient de la lettre grecque delta (Δ), car sa forme ressemble à un triangle renversé."},{id:"pectoraux",kind:"muscle",name:"Pectoraux",latin:"Musculus pectoralis major",system:"musculaire",color:"#a82f3f",region:"Poitrine",description:"Le grand pectoral est un large muscle en éventail qui relie le sternum, les côtes et la clavicule à l'humérus.",role:"Ramène le bras vers le corps, le fait tourner en dedans et participe à l'inspiration forcée.",funFact:"Chez certains mammifères, les pectoraux sont si puissants qu'ils permettent le vol battu — chez l'humain, ils poussent."},{id:"dorsaux",kind:"muscle",name:"Grand dorsal",latin:"Musculus latissimus dorsi",system:"musculaire",color:"#963342",region:"Bas du dos",description:"Le plus large muscle du corps, il part du bas du dos et du bassin pour s'insérer sur l'humérus.",role:"Tire le bras vers le bas et en arrière, participe aux tractions et à la respiration forcée.",funFact:"C'est le muscle qui donne au dos sa forme en V chez les nageurs et les grimpeurs."},{id:"abdominaux",kind:"muscle",name:"Abdominaux",latin:"Rectus abdominis",system:"musculaire",color:"#c04a54",region:"Abdomen",description:"Le grand droit de l'abdomen s'étend du pubis aux côtes, divisé par des intersections tendineuses qui dessinent les « tablettes ».",role:"Fléchit le tronc, stabilise le bassin et comprime les viscères ; avec les obliques, il protège la colonne.",funFact:"Les « abdos » ne se dessinent pas en faisant des séries interminables : la visibilité dépend surtout du taux de masse grasse."},{id:"obliques",kind:"muscle",name:"Obliques",latin:"Musculus obliquus externus abdominis",system:"musculaire",color:"#b84452",region:"Côtés de l'abdomen",description:"Le grand oblique est une large nappe musculaire qui recouvre les côtés de l'abdomen, des côtes basses au bassin.",role:"Fait tourner et incliner le tronc, comprime les viscères et participe à l'expiration forcée ; il stabilise la colonne avec les autres abdominaux.",funFact:"Ses fibres descendent en diagonale, comme les mains dans les poches : c'est le muscle qui travaille quand on tourne le buste."},{id:"biceps",kind:"muscle",name:"Biceps brachial",latin:"Musculus biceps brachii",system:"musculaire",color:"#b93c4a",region:"Bras",description:"Muscle à deux chefs du bras, le biceps s'insère sur l'omoplate et le radius ; son tendon passe dans la gouttière du coude.",role:"Fléchit le coude et tourne l'avant-bras (supination), par exemple pour porter une tasse à la bouche.",funFact:"Le biceps a deux chefs, mais aussi un rôle de supinateur plus puissant que de fléchisseur : il permet de visser un bouchon."},{id:"triceps",kind:"muscle",name:"Triceps brachial",latin:"Musculus triceps brachii",system:"musculaire",color:"#a33240",region:"Arrière du bras",description:"Trois chefs musculaires à l'arrière du bras, réunis sur un tendon unique qui s'insère sur l'olécrane du coude.",role:"Étend le coude, permet de pousser et stabilise l'épaule ; antagoniste du biceps.",funFact:"C'est le triceps qui travaille quand vous faites une pompe : sans lui, impossible de repousser le sol."},{id:"fessiers",kind:"muscle",name:"Fessiers",latin:"Musculus gluteus maximus",system:"musculaire",color:"#a52f3e",region:"Bassin",description:"Le grand fessier est le muscle le plus volumineux du corps, épais et puissant, qui recouvre l'arrière du bassin.",role:"Étend et stabilise la hanche, permet de se lever, de monter les escaliers et de courir ; soutient le bassin.",funFact:"Son développement est un trait typiquement humain, lié à la station debout et à la course d'endurance."},{id:"quadriceps",kind:"muscle",name:"Quadriceps",latin:"Musculus quadriceps femoris",system:"musculaire",color:"#b83a48",region:"Avant de la cuisse",description:"Quatre muscles fusionnent sur un tendon commun qui englobe la rotule : droit fémoral, vastes intermédiaire, médial et latéral.",role:"Étend le genou et fléchit la hanche ; c'est le muscle essentiel de la marche, du saut et de la montée d'escalier.",funFact:"C'est le muscle le plus fort du corps humain ; son tendon peut transmettre plusieurs centaines de kilos de force."},{id:"ischio_jambiers",kind:"muscle",name:"Ischio-jambiers",latin:"Musculi ischiocrurales",system:"musculaire",color:"#963342",region:"Arrière de la cuisse",description:"Groupe de trois muscles à l'arrière de la cuisse, du bassin au tibia et au péroné.",role:"Fléchissent le genou et étendent la hanche, indispensables à la course et au freinage ; souvent victimes de claquages.",funFact:"Lors d'un sprint, les ischio-jambiers peuvent être étirés à plus de 130 % de leur longueur de repos."},{id:"mollets",kind:"muscle",name:"Mollets",latin:"Gastrocnemius et soleus",system:"musculaire",color:"#a83242",region:"Arrière de la jambe",description:"Le triceps sural réunit les deux gastrocnémiens et le soléaire, qui se terminent sur le tendon d'Achille.",role:"Pointent le pied et permettent de se tenir debout sur la pointe des pieds, de marcher et de sauter.",funFact:"Le tendon d'Achille est le plus épais du corps et supporte jusqu'à 4 kN, soit environ 400 kg de traction."}],ul=Object.fromEntries([...Vu,...Nv,...Uv].map(i=>[i.id,i])),Fv=new Set(["cerveau","coeur","poumons","foie","estomac","reins","intestin_grele","vessie"]),xi=Math.PI,Qr=Math.PI*2;function Bn(i,e={}){return new Yt({color:new Ae(i),roughness:.5,metalness:.05,emissive:new Ae(i),emissiveIntensity:.04,...e})}function Ce(i,e,t,n,s=32){const r=new We(new Vt(1,s,Math.round(s*.7)),n);return r.scale.set(i,e,t),r}function Ve(i,e,t,n=10,s=64){const r=new il(i.map(f=>new w(...f)),!1,"catmullrom",.35),a=r.computeFrenetFrames(s,!1),o=[],c=[],l=typeof e=="function"?e:()=>e;for(let f=0;f<=s;f++){const u=f/s,h=r.getPointAt(u),m=a.normals[f],_=a.binormals[f],g=Math.max(8e-4,l(u));for(let p=0;p<n;p++){const y=p/n*Qr,E=Math.cos(y),S=Math.sin(y);o.push(h.x+m.x*E*g+_.x*S*g,h.y+m.y*E*g+_.y*S*g,h.z+m.z*E*g+_.z*S*g)}}for(let f=0;f<s;f++)for(let u=0;u<n;u++){const h=f*n+u,m=f*n+(u+1)%n,_=(f+1)*n+u,g=(f+1)*n+(u+1)%n;c.push(h,_,m,m,_,g)}const d=new dt;return d.setAttribute("position",new Xe(o,3)),d.setIndex(c),d.computeVertexNormals(),new We(d,t)}function Xc(i,e=36){const t=[],n=[];for(const d of i)for(let f=0;f<e;f++){const u=f/e*Qr;t.push(Math.cos(u)*d.rx,d.y,Math.sin(u)*d.rz+(d.z||0))}for(let d=0;d<i.length-1;d++)for(let f=0;f<e;f++){const u=d*e+f,h=d*e+(f+1)%e,m=(d+1)*e+f,_=(d+1)*e+(f+1)%e;n.push(u,m,h,h,m,_)}const s=i[0],r=i[i.length-1],a=t.length/3;t.push(0,s.y,s.z||0);for(let d=0;d<e;d++)n.push(a,(d+1)%e,d);const o=t.length/3;t.push(0,r.y,r.z||0);const c=(i.length-1)*e;for(let d=0;d<e;d++)n.push(o,c+d,c+(d+1)%e);const l=new dt;return l.setAttribute("position",new Xe(t,3)),l.setIndex(n),l.computeVertexNormals(),l}function $c(i=9,e=.05,t=0){const n=new Vt(1,56,40),s=n.attributes.position,r=new w;for(let a=0;a<s.count;a++){r.fromBufferAttribute(s,a);const o=Math.atan2(r.z,r.x),c=Math.acos(Qo.clamp(r.y,-1,1)),l=1+e*Math.sin(c*i*1.7+t)*Math.sin(o*i+t*2)+e*.45*Math.sin(c*i*3.4+o*2.2);r.multiplyScalar(l),s.setXYZ(a,r.x,r.y,r.z)}return n.computeVertexNormals(),n}function Ov(i){const e=document.createElement("div");e.className="organ-label",Fv.has(i.id)&&e.classList.add("major"),e.innerHTML=`<i style="--c:${i.color}"></i><span>${i.name}</span>`;const t=new Mv(e);t.position.set(0,.012,0),t.center.set(0,1),i.label=t,i.labelEl=e,i.group.add(t)}function Bv(){return new Qt({transparent:!0,depthWrite:!1,side:Zt,uniforms:{uBase:{value:new Ae("#8ec5e6")},uRim:{value:new Ae("#67e8f9")},uOpacity:{value:1},uTime:{value:0},uTint:{value:new Ae("#67e8f9")},uScan:{value:1}},vertexShader:`
      varying vec3 vN;
      varying vec3 vV;
      varying vec3 vW;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vW = wp.xyz;
        vN = normalize(mat3(modelMatrix) * normal);
        vV = normalize(cameraPosition - wp.xyz);
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,fragmentShader:`
      uniform vec3 uBase;
      uniform vec3 uRim;
      uniform vec3 uTint;
      uniform float uOpacity;
      uniform float uTime;
      uniform float uScan;
      varying vec3 vN;
      varying vec3 vV;
      varying vec3 vW;
      void main() {
        float fres = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.1);
        float scan = smoothstep(0.86, 1.0, sin(vW.y * 22.0 - uTime * 1.1) * 0.5 + 0.5) * uScan;
        vec3 col = mix(uBase, uRim, fres * 0.95) + uTint * scan * 0.12;
        float alpha = (0.028 + fres * 0.52 + scan * 0.025) * uOpacity;
        gl_FragColor = vec4(col, alpha);
      }
    `})}function zv(){const i=new qt;i.name="skin";const e=Bv(),t=new We(Xc([{y:.835,rx:.148,rz:.1,z:.005},{y:.875,rx:.173,rz:.112,z:.004},{y:.93,rx:.176,rz:.113,z:.002},{y:.99,rx:.164,rz:.108,z:.006},{y:1.05,rx:.153,rz:.104,z:.008},{y:1.11,rx:.158,rz:.11,z:.006},{y:1.17,rx:.173,rz:.118,z:.003},{y:1.24,rx:.19,rz:.128,z:0},{y:1.3,rx:.199,rz:.13,z:-.002},{y:1.36,rx:.2,rz:.127,z:-.004},{y:1.405,rx:.186,rz:.117,z:-.003},{y:1.44,rx:.148,rz:.104,z:.004}]),e);i.add(t);const n=new We(Xc([{y:1.43,rx:.064,rz:.058,z:.008},{y:1.48,rx:.057,rz:.052,z:.01},{y:1.53,rx:.052,rz:.048,z:.01}]),e);i.add(n);const s=Ce(.089,.116,.097,e,48);s.position.set(0,1.648,.008),i.add(s);const r=Ce(.058,.052,.062,e,32);r.position.set(0,1.573,.027),i.add(r);const a=Ce(.011,.028,.016,e,16);a.position.set(0,1.63,.104),i.add(a);for(const o of[-1,1]){const c=Ve([[o*.19,1.405,0],[o*.218,1.32,.004],[o*.245,1.2,.01],[o*.253,1.13,.012],[o*.268,1.02,.018],[o*.281,.9,.024]],m=>.045-m*.021,e,14,64);i.add(c);const l=Ce(.029,.046,.019,e,24);l.position.set(o*.285,.835,.03),i.add(l);for(let m=0;m<4;m++){const _=o*(.273+m*.008),g=Ve([[_,.825,.035],[_+o*.002,.79,.04],[_+o*.003,.762,.045]],p=>.006-p*.002,e,8,16);i.add(g)}const d=Ve([[o*.262,.845,.043],[o*.255,.82,.055],[o*.256,.802,.062]],.007,e,8,14);i.add(d);const f=Ve([[o*.085,.87,0],[o*.084,.76,.002],[o*.081,.62,.006],[o*.078,.475,.012],[o*.077,.36,.012],[o*.075,.24,.008],[o*.074,.1,.008]],m=>.076-m*.042,e,16,72);i.add(f);const u=Ce(.045,.038,.108,e,24);u.position.set(o*.075,.045,.055),i.add(u);const h=Ce(.035,.036,.045,e,20);h.position.set(o*.074,.05,0),i.add(h)}return i.traverse(o=>{o.isMesh&&(o.renderOrder=20)}),{group:i,material:e}}function kv(){const i=new qt;i.name="skeleton";const e={},t=()=>Bn("#e5ddc8",{roughness:.58,metalness:.08,emissive:"#7b715c",emissiveIntensity:.06});function n(s){const r=ul[s],a=new qt;a.name=s,i.add(a);const o=[],c=t();o.push(c);const l={...r,kind:"bone",group:a,materials:o,meshes:[],base:new w};return e[s]=l,s==="colonne"&&(l.vertebrae=[]),{e:l,group:a,material:c}}{const{e:s,group:r,material:a}=n("crane"),o=Ce(.078,.092,.087,a,40);o.position.set(0,1.665,.006),r.add(o);const c=Ce(.055,.06,.062,a,32);c.position.set(0,1.59,.032),r.add(c);const l=Ce(.026,.018,.02,a,16);l.position.set(.045,1.6,.055),r.add(l);const d=l.clone();d.position.x=-.045,r.add(d);const f=Ve([[-.055,1.585,.028],[-.035,1.548,.06],[.035,1.548,.06],[.055,1.585,.028]],.009,a,7,28);r.add(f),s.group=r}{const{e:s,group:r,material:a}=n("colonne"),o=[],c=24;for(let l=0;l<c;l++){const d=l/(c-1),f=1.525-d*.585,u=-.052+Math.sin(d*xi)*.012+(d>.72?.01:0),h=new We(new Fs(.019,.021,.014,12),a);h.position.set(0,f,u),r.add(h);const m=new We(new rs(.012,.008,.03),a);if(m.position.set(0,f+.001,u-.022),r.add(m),l%2===0){const _=new We(new Fs(.0165,.0165,.004,12),Bn("#a9c4c1",{roughness:.5,emissive:"#3a5b56",emissiveIntensity:.05}));_.position.set(0,f-.009,u),r.add(_),s.materials.push(_.material)}o.push({mesh:h,base:h.position.clone(),spinous:m,spinousBase:m.position.clone(),t:d})}s.vertebrae=o}{const{e:s,group:r,material:a}=n("cotes");for(let c=0;c<10;c++){const l=c/9,d=1.375-l*.26,f=.155-(c<2?.008:0)-l*.018;for(const u of[-1,1]){const h=Ve([[u*.025,d,-.045],[u*.075,d+.002,-.03],[u*.135,d-.002,.015],[u*f,d-.012,.055],[u*.105,d-.026,.082],[u*.035,d-.04,.093]],.0062-l*.0012,a,7,36);r.add(h)}}const o=Ve([[0,1.38,.088],[0,1.31,.096],[0,1.22,.094],[0,1.145,.088]],c=>.011-c*.003,a,8,32);r.add(o),s.group=r}{const{e:s,group:r,material:a}=n("clavicule");for(const o of[-1,1]){const c=Ve([[o*.012,1.4,.084],[o*.075,1.425,.055],[o*.145,1.432,.015],[o*.19,1.418,-.005]],.0075,a,7,28);r.add(c)}s.group=r}{const{e:s,group:r,material:a}=n("bassin"),o=[];for(let d=0;d<=26;d++){const f=d/26*Qr;o.push([Math.cos(f)*.135,.885+Math.sin(f*2)*.008,Math.sin(f)*.085])}const c=Ve(o,.013,a,8,80);r.add(c);const l=new We(new $r(.04,.09,4),a);l.position.set(0,.92,-.07),l.rotation.x=-.3,l.rotation.y=xi/4,r.add(l);for(const d of[-1,1]){const f=Ce(.065,.058,.016,a,24);f.position.set(d*.105,.945,-.022),f.rotation.z=d*.35,f.rotation.y=d*-.2,r.add(f);const u=new We(new Hs(.024,.009,8,20),a);u.position.set(d*.083,.868,.008),u.rotation.y=xi/2,r.add(u)}s.group=r}{const{e:s,group:r,material:a}=n("omoplate");for(const o of[-1,1]){const c=Ce(.058,.07,.011,a,20);c.position.set(o*.112,1.315,-.066),c.rotation.z=o*-.22,c.rotation.x=.12,r.add(c);const l=Ve([[o*.06,1.345,-.073],[o*.11,1.335,-.075],[o*.165,1.335,-.06]],.007,a,6,20);r.add(l)}s.group=r}{const{e:s,group:r,material:a}=n("humerus");for(const o of[-1,1]){const c=Ve([[o*.19,1.4,-.002],[o*.222,1.32,.006],[o*.243,1.2,.01],[o*.25,1.14,.014]],.0135,a,8,24);r.add(c);const l=Ce(.02,.022,.02,a,16);l.position.set(o*.192,1.407,.002),r.add(l);for(const d of[-1,1]){const f=Ce(.011,.014,.011,a,12);f.position.set(o*.248+d*.008,1.133,.017),r.add(f)}}s.group=r}{const{e:s,group:r,material:a}=n("avant_bras");for(const o of[-1,1])for(const c of[-.008,.008]){const l=Ve([[o*(.249+c),1.132,.018],[o*(.263+c),1.02,.023],[o*(.276+c),.905,.028]],c===.008?.0065:.0085,a,7,20);r.add(l)}s.group=r}{const{e:s,group:r,material:a}=n("main");for(const o of[-1,1]){const c=Ce(.026,.038,.014,a,16);c.position.set(o*.283,.858,.031),r.add(c);for(let d=0;d<4;d++){const f=o*(.271+d*.008),u=Ve([[f,.847,.036],[f+o*.002,.812,.041],[f+o*.003,.785,.045]],.004,a,5,12);r.add(u)}const l=Ve([[o*.258,.86,.042],[o*.251,.835,.053]],.0045,a,5,10);r.add(l)}s.group=r}{const{e:s,group:r,material:a}=n("femur");for(const o of[-1,1]){const c=Ve([[o*.09,.86,0],[o*.086,.76,.002],[o*.081,.61,.008],[o*.078,.49,.012]],.0165,a,9,28);r.add(c);const l=Ce(.022,.022,.022,a,16);l.position.set(o*.073,.868,.002),r.add(l);const d=Ce(.022,.026,.018,a,16);d.position.set(o*.077,.485,.014),r.add(d)}s.group=r}{const{e:s,group:r,material:a}=n("rotule");for(const o of[-1,1]){const c=Ce(.022,.026,.012,a,16);c.position.set(o*.078,.487,.045),r.add(c)}s.group=r}{const{e:s,group:r,material:a}=n("tibia");for(const o of[-1,1]){const c=Ve([[o*.077,.472,.012],[o*.076,.34,.014],[o*.074,.2,.012],[o*.073,.08,.01]],.0135,a,8,26);r.add(c);const l=Ve([[o*.093,.46,.004],[o*.091,.32,.004],[o*.088,.13,.008]],.007,a,6,20);r.add(l)}s.group=r}{const{e:s,group:r,material:a}=n("pied");for(const o of[-1,1]){const c=Ce(.035,.022,.07,a,16);c.position.set(o*.075,.028,.045),r.add(c);for(let l=0;l<5;l++){const d=Ce(.008,.008,.022,a,10);d.position.set(o*(.045+l*.014),.016,.115),r.add(d)}}s.group=r}return{group:i,entries:e}}function Hv(){const i=new qt;i.name="muscles";const e={};function t(n){const s=ul[n],r=new qt,a=Bn(s.color,{roughness:.62,metalness:.02,emissive:new Ae(s.color).multiplyScalar(.5),emissiveIntensity:.08,transparent:!0,opacity:.94});i.add(r);const o={...s,kind:"muscle",group:r,materials:[a],meshes:[]};return e[n]=o,{e:o,group:r,material:a}}{const{group:n,material:s}=t("trapezes");for(const a of[-1,1]){const o=Ce(.085,.028,.028,s,24);o.position.set(a*.082,1.435,-.025),o.rotation.z=a*-.22,n.add(o);const c=Ce(.055,.1,.025,s,24);c.position.set(a*.105,1.34,-.058),c.rotation.z=a*.18,c.rotation.x=.15,n.add(c)}const r=Ce(.045,.05,.025,s,20);r.position.set(0,1.47,-.03),n.add(r)}{const{group:n,material:s}=t("deltoides");for(const r of[-1,1]){const a=Ce(.053,.068,.052,s,28);a.position.set(r*.205,1.385,.002),a.rotation.z=r*.2,n.add(a)}}{const{group:n,material:s}=t("pectoraux");for(const r of[-1,1]){const a=Ce(.077,.062,.03,s,28);a.position.set(r*.077,1.315,.078),a.rotation.z=r*-.1,n.add(a)}}{const{group:n,material:s}=t("dorsaux");for(const r of[-1,1]){const a=Ce(.068,.15,.032,s,26);a.position.set(r*.112,1.235,-.07),a.rotation.z=r*.12,n.add(a)}}{const{group:n,material:s}=t("abdominaux");for(let r=0;r<3;r++)for(const a of[-1,1]){const o=Ce(.033,.026,.012,s,16);o.position.set(a*.035,1.155-r*.052,.1-r*.003),n.add(o)}}{const{group:n,material:s}=t("obliques");for(const r of[-1,1]){const a=Ce(.024,.085,.014,s,18);a.position.set(r*.095,1.09,.085),a.rotation.z=r*-.18,n.add(a)}}{const{group:n,material:s}=t("biceps"),r=t("triceps");for(const a of[-1,1]){const o=Ce(.028,.082,.029,s,20);o.position.set(a*.229,1.255,.027),o.rotation.z=a*.16,n.add(o);const c=Ce(.027,.09,.027,r.material,20);c.position.set(a*.237,1.25,-.019),c.rotation.z=a*.16,r.group.add(c)}}{const{group:n,material:s}=t("fessiers");for(const r of[-1,1]){const a=Ce(.073,.088,.055,s,28);a.position.set(r*.083,.887,-.072),a.rotation.z=r*.12,n.add(a)}}{const{group:n,material:s}=t("quadriceps");for(const r of[-1,1]){const a=Ce(.056,.155,.055,s,26);a.position.set(r*.082,.665,.028),a.rotation.z=r*.04,n.add(a)}}{const{group:n,material:s}=t("ischio_jambiers");for(const r of[-1,1]){const a=Ce(.05,.145,.048,s,26);a.position.set(r*.086,.66,-.031),n.add(a)}}{const{group:n,material:s}=t("mollets");for(const r of[-1,1]){const a=Ce(.043,.1,.042,s,24);a.position.set(r*.077,.305,-.02),n.add(a)}}return{group:i,entries:e}}function Gv(){const i=new qt;i.name="organs";const e={};function t(n,s,r){const a=ul[n],o=new qt;o.position.set(...s),o.name=n,i.add(o);const c=Bn(a.color,{roughness:.43,metalness:.06,emissive:new Ae(a.color).multiplyScalar(.55),emissiveIntensity:.08}),l={...a,kind:"organ",group:o,materials:[c],meshes:[],center:o.position.clone()};return e[n]=l,Ov(l),{e:l,group:o,material:c}}{const{e:n,group:s,material:r}=t("cerveau",[0,1.665,.004]),a=$c(11,.05,1.3);for(const o of[-1,1]){const c=new We(a,r);c.scale.set(.052,.069,.073),c.position.set(o*.049,0,0),c.rotation.y=o*.3,s.add(c)}n.group=s}{const{e:n,group:s,material:r}=t("cervelet",[0,1.607,-.062]),a=$c(22,.035,3.1),o=new We(a,r);o.scale.set(.046,.031,.036),s.add(o);const c=new We(a,r);c.scale.set(.026,.022,.026),c.position.set(.033,-.004,-.004),s.add(c);const l=c.clone();l.position.x=-.033,s.add(l),n.group=s}{const{e:n,group:s,material:r}=t("tronc_cerebral",[0,1.607,-.014]),a=Ve([[0,.04,.006],[0,.008,-.005],[0,-.03,-.012],[0,-.062,-.004]],o=>.021-o*.008,r,12,24);s.add(a),n.group=s}{const{e:n,group:s,material:r}=t("moelle_epiniere",[0,1.255,-.043]),a=Ve([[0,.3,.006],[0,.16,-.002],[0,0,-.004],[0,-.16,.002],[0,-.29,.012]],.0115,r,10,64);s.add(a);for(let o=0;o<7;o++){const c=.2-o*.07;for(const l of[-1,1]){const d=Ve([[0,c,0],[l*.032,c-.008,.012],[l*.05,c-.014,.025]],.0035,r,5,10);s.add(d)}}n.group=s}{const{e:n,group:s,material:r}=t("coeur",[.033,1.252,.012]),a=Ce(.046,.075,.043,r,32);a.position.set(.005,-.012,0),a.rotation.z=-.18,a.rotation.x=-.12,s.add(a);const o=r.clone();o.color.set("#c23a50"),o.emissive.set("#8e1e30"),n.materials.push(o);const c=Ce(.038,.058,.036,o,28);c.position.set(-.033,-.006,.009),c.rotation.z=.12,s.add(c);const l=Ce(.032,.027,.029,r,24);l.position.set(.03,.061,-.003),s.add(l);const d=Ce(.029,.025,.027,o,24);d.position.set(-.027,.056,.005),s.add(d);const f=Ve([[.015,.075,-.005],[.008,.105,-.014],[0,.115,-.028]],.012,Bn("#c85555",{roughness:.5,emissive:"#7a1f1f",emissiveIntensity:.1}),10,16);s.add(f);const u=Ve([[-.02,.068,0],[-.025,.1,-.01],[-.02,.12,-.022]],.009,Bn("#5b7fa8",{roughness:.5}),8,14);s.add(u),n.group=s}{const{e:n,group:s,material:r}=t("coronaires",[.033,1.252,.012]),a=Ve([[.005,.075,.018],[.035,.035,.045],[.038,-.02,.042],[.022,-.06,.024],[.005,-.082,.008]],c=>.0038-c*.0014,r,7,28);s.add(a);const o=Ve([[-.015,.06,.025],[-.045,.02,.035],[-.052,-.02,.024],[-.043,-.045,.008]],c=>.0032-c*.0012,r,7,24);s.add(o),n.group=s}{const{e:n,group:s,material:r}=t("aorte",[0,1.28,0]),a=Ve([[.004,.02,.015],[.008,.085,.002],[.032,.125,-.03],[.026,.09,-.055],[.008,.03,-.06],[.002,-.06,-.062],[0,-.17,-.056],[0,-.24,-.048]],o=>.016-o*.004,r,12,60);s.add(a);for(const o of[-1,1]){const c=Ve([[0,-.235,-.048],[o*.035,-.275,-.045],[o*.058,-.315,-.038]],.0085,r,8,18);s.add(c)}for(let o=0;o<3;o++){const c=Ve([[.015+o*.008,.115,-.03+o*.006],[.03+o*.012,.16,-.025+o*.008],[.04+o*.012,.19,-.02+o*.006]],.004,r,6,12);s.add(c)}n.group=s}{const{e:n,group:s,material:r}=t("poumons",[0,1.255,0]),a=r.clone();a.color.set("#ef9aa4"),a.emissive.set("#b34a58"),n.materials.push(a);for(const o of[-1,1]){const c=o>0,l=Ce(.058,.074,.055,r,32);l.position.set(o*.097,.048,-.002),l.rotation.z=o*-.07,s.add(l);const d=Ce(c?.058:.067,.082,.057,a,32);if(d.position.set(o*(c?.112:.101),-.05,.002),d.rotation.z=o*.06,s.add(d),!c){const u=Ce(.045,.043,.052,r,24);u.position.set(-.09,-.006,.02),s.add(u)}const f=Ve([[o*.07,0,.045],[o*.1,-.004,.02],[o*.13,-.006,-.015]],.0026,Bn("#b46670",{roughness:.7}),5,12);s.add(f)}n.group=s}{const{e:n,group:s,material:r}=t("bronches",[0,1.33,0]),a=Bn("#f3c6cd",{roughness:.45,emissive:"#a35c68",emissiveIntensity:.08});n.materials.push(a);const o=Ve([[0,.13,0],[0,.08,.002],[0,.035,.002]],.012,r,10,24);s.add(o);for(let c=0;c<7;c++){const l=new We(new Hs(.012,.0022,6,18),a);l.position.set(0,.118-c*.0125,.001),l.rotation.x=xi/2,s.add(l)}for(const c of[-1,1]){const l=Ve([[0,.036,0],[c*.035,.005,0],[c*.07,-.025,0],[c*.095,-.06,-.004]],f=>.0085-f*.003,r,8,28);s.add(l);const d=[[[c*.06,-.015,0],[c*.085,-.03,.028],[c*.11,-.055,.042]],[[c*.075,-.03,0],[c*.105,-.055,-.025],[c*.125,-.085,-.035]],[[c*.088,-.048,0],[c*.112,-.08,.02],[c*.118,-.105,.03]]];for(const f of d){const u=Ve(f,h=>.0055-h*.003,r,7,20);s.add(u)}}n.group=s}{const{e:n,group:s,material:r}=t("oesophage",[0,1.2,0]),a=Ve([[0,.235,-.014],[0,.16,-.008],[0,.06,-.004],[0,-.03,-.006],[.02,-.085,.002],[.042,-.105,.012]],o=>.011-o*.0025,r,9,40);s.add(a),n.group=s}{const{e:n,group:s,material:r}=t("estomac",[.06,1.085,.012]),a=Ve([[-.038,.058,-.008],[-.048,.026,.014],[-.028,-.018,.03],[.014,-.042,.03],[.045,-.018,.018],[.04,.018,0]],c=>c<.2?.024+c*.04:.032-c*.014,r,14,48);s.add(a);const o=Ce(.033,.04,.029,r,24);o.position.set(-.04,.046,.004),s.add(o),n.group=s}{const{e:n,group:s,material:r}=t("foie",[-.085,1.09,.017]),a=Ce(.092,.06,.048,r,36);a.position.set(-.015,.004,0),a.rotation.z=.14,a.rotation.x=-.08,s.add(a);const o=Ce(.052,.036,.041,r,28);o.position.set(.082,.002,-.004),o.rotation.z=-.2,s.add(o);const c=Ce(.04,.03,.035,r,20);c.position.set(-.045,-.035,.014),s.add(c),n.group=s}{const{e:n,group:s,material:r}=t("vesicule",[-.14,1.04,.038]),a=Ce(.017,.028,.016,r,20);a.rotation.z=.25,s.add(a);const o=Ve([[.002,.02,.002],[.006,.045,.006],[.012,.06,.008]],.005,r,6,12);s.add(o),n.group=s}{const{e:n,group:s,material:r}=t("pancreas",[.008,1.075,-.032]),a=Ve([[-.078,.002,0],[-.04,.014,.004],[0,.01,.002],[.04,-.002,-.002],[.078,.014,-.008]],c=>.014-Math.abs(c-.2)*.012,r,10,36);s.add(a);const o=Ce(.022,.025,.02,r,18);o.position.set(-.072,-.006,0),s.add(o),n.group=s}{const{e:n,group:s,material:r}=t("intestin_grele",[0,.995,.022]),a=[];for(let c=0;c<=110;c++){const l=c/110,d=.062*Math.sin(l*xi*9.4+.4),f=.065-l*.14,u=.03*Math.cos(l*xi*12.5)+Math.sin(l*xi*4.2)*.008;a.push([d,f,u])}const o=Ve(a,.0105,r,8,180);s.add(o),n.group=s}{const{e:n,group:s,material:r}=t("colon",[0,1,.005]),a=Ve([[-.055,-.062,.018],[-.115,-.058,.012],[-.132,-.015,.006],[-.13,.033,.004],[-.105,.05,.02],[-.06,.052,.033],[0,.054,.035],[.06,.052,.03],[.112,.042,.012],[.128,0,.004],[.124,-.048,.008],[.09,-.073,.016],[.045,-.077,.022],[.01,-.064,.012],[0,-.075,-.006]],l=>.0165-l*.002,r,10,80);s.add(a);const o=Ve([[-.06,-.062,.018],[-.075,-.085,.02],[-.082,-.103,.022]],.005,r,6,14);s.add(o);const c=r.clone();c.color.set("#c99372"),n.materials.push(c);for(let l=0;l<14;l++){const f=(.06+l/14*.82)*Qr,u=Math.cos(f)*.122,h=Math.sin(f)*.08,m=.02+Math.cos(f*2)*.02;if(h>-.02&&h<.045&&u>-.14&&u<.14){const _=Ce(.008,.006,.008,c,8);_.position.set(u,m,h),s.add(_)}}n.group=s}{const{e:n,group:s,material:r}=t("reins",[0,1.02,-.06]);for(const a of[-1,1]){const o=Ce(.028,.054,.023,r,28);o.position.set(a*.075,0,0),o.rotation.z=a*.16,o.rotation.x=-.12,s.add(o);const c=Ce(.011,.022,.012,Bn("#6b2934",{roughness:.6}),14);c.position.set(a*.058,-.004,.012),s.add(c),n.materials.push(c.material)}n.group=s}{const{e:n,group:s,material:r}=t("ureteres",[0,.955,-.02]);for(const a of[-1,1]){const o=Ve([[a*.065,.052,-.038],[a*.05,.014,-.01],[a*.024,-.022,.02],[a*.012,-.043,.036]],.0042,r,6,24);s.add(o)}n.group=s}{const{e:n,group:s,material:r}=t("vessie",[0,.895,.028]),a=Ce(.034,.03,.029,r,26);s.add(a);const o=Ve([[0,-.024,.004],[0,-.042,0]],.008,r,7,8);s.add(o),n.group=s}{const{e:n,group:s,material:r}=t("rate",[.112,1.118,-.048]),a=Ce(.031,.055,.025,r,28);a.rotation.z=-.2,a.rotation.x=.1,s.add(a),n.group=s}{const{e:n,group:s,material:r}=t("thyroide",[0,1.472,.03]);for(const o of[-1,1]){const c=Ce(.016,.028,.013,r,18);c.position.set(o*.019,.002,0),c.rotation.z=o*-.25,s.add(c)}const a=Ce(.02,.008,.01,r,14);a.position.set(0,-.012,.002),s.add(a),n.group=s}{const{e:n,group:s,material:r}=t("surrenales",[0,1.098,-.055]);for(const a of[-1,1]){const o=Ce(.021,.012,.016,r,16);o.position.set(a*.078,0,0),o.rotation.z=a*.2,s.add(o)}n.group=s}return{group:i,entries:e}}function Vv(){const i=new qt;i.name="body";const e=zv(),t=kv(),n=Hv(),s=Gv();i.add(e.group,t.group,n.group,s.group),t.group.visible=!1,n.group.visible=!1;const r={...s.entries,...t.entries,...n.entries};for(const a of Object.values(r))a.meshes=[],a.meshBase=new Map,a.group.traverse(o=>{if(o.isMesh&&(o.userData.pickId=a.id,a.meshes.push(o),a.meshBase.set(o,{scale:o.scale.clone(),position:o.position.clone(),rotation:o.rotation.clone()}),!o.material.userData.__orig)){const c=o.material;c.userData.__orig={color:c.color.clone(),emissive:c.emissive?c.emissive.clone():new Ae(0),emissiveIntensity:c.emissiveIntensity??0,opacity:c.opacity,transparent:c.transparent,depthWrite:c.depthWrite,roughness:c.roughness}}});return{root:i,skinGroup:e.group,skinMaterial:e.material,skeletonGroup:t.group,musclesGroup:n.group,organsGroup:s.group,entries:r}}const Ot={hr:72,spo2:98,rr:14,sbp:120,dbp:80,temp:36.8},tt=(i,e,t,n,s,r)=>({hr:i,spo2:e,rr:t,sbp:n,dbp:s,temp:r}),Hn=[{id:"asthme",name:"Asthme",system:"respiratoire",course:"Chronique",frequency:"Très fréquente",tagline:"Des bronches qui se resserrent et s'enflamment par crises.",description:"L'asthme est une inflammation chronique des voies aériennes. Les bronches deviennent hyperréactives : au contact d'un déclencheur, leurs muscles se contractent, la muqueuse gonfle et le mucus s'accumule, ce qui gêne le passage de l'air.",mechanism:"La bronchoconstriction réduit fortement le calibre des bronchioles. L'air entre encore, mais ressort mal : les poumons se vident lentement, d'où le sifflement expiratoire et la sensation d'étouffement. L'inflammation chronique épaissit peu à peu la paroi bronchique.",symptoms:["Sifflements expiratoires","Essoufflement","Toux sèche nocturne","Oppression thoracique","Réveils nocturnes","Difficulté à finir d'expirer"],causes:["Prédisposition génétique et allergie","Acariens, pollens, poils d'animaux","Pollution et tabagisme passif","Infections virales respiratoires","Effort à l'air froid"],treatments:["Bronchodilatateurs de secours","Corticoïdes inhalés de fond","Plan d'action personnalisé","Contrôle des allergènes"],prevention:["Éviter les déclencheurs identifiés","Suivre le traitement de fond","Vaccination antigrippale","Tabac strictement interdit"],fact:"L'asthme n'est pas une maladie « psychologique » : l'inflammation bronchique est bien réelle, même entre les crises.",vitals:tt(104,92,26,118,76,36.9),effects:[{target:"bronches",type:"obstruction",amount:.88,label:"Bronchoconstriction",note:"Les muscles lisses des bronchioles se contractent et le mucus obstrue la lumière : l'air circule mal."},{target:"poumons",type:"inflammation",amount:.42,label:"Inflammation des bronches",note:"Muqueuse gonflée et hypersensible : les crises se répètent au moindre déclencheur."}],stages:[{label:"Gêne légère",text:"Sifflements discrets à l'effort, toux sèche. La bronche reste globalement ouverte."},{label:"Crise modérée",text:"Le calibre des bronchioles chute, l'expiration siffle et le souffle se raccourcit."},{label:"Crise sévère",text:"Obstruction majeure, respiration rapide et superficielle, SpO₂ en baisse : urgence médicale."}]},{id:"bpco",name:"BPCO",system:"respiratoire",course:"Chronique",frequency:"Fréquente",tagline:"Le tabac détruit lentement les alvéoles et les bronches.",description:"La bronchopneumopathie chronique obstructive (BPCO) associe une obstruction bronchique fixe et une destruction des alvéoles (emphysème). Les poumons perdent leur élasticité et emprisonnent l'air.",mechanism:"Les alvéoles fusionnent et disparaissent : la surface d'échange chute. En parallèle, les bronches s'épaississent et produisent trop de mucus. Le patient « souffle » difficilement, surtout à l'effort.",symptoms:["Essoufflement progressif","Toux chronique","Expectorations","Sifflements","Infections répétées","Perte de poids"],causes:["Tabagisme (85 % des cas)","Exposition professionnelle aux poussières","Pollution de l'air","Déficit génétique en alpha-1-antitrypsine"],treatments:["Arrêt du tabac","Bronchodilatateurs de longue durée","Réhabilitation respiratoire","Oxygène à domicile si besoin"],prevention:["Ne jamais fumer","Protéger les voies respiratoires au travail","Vaccinations","Activité physique régulière"],fact:"Dans la BPCO, les poumons sont souvent plus grands qu'à la normale : ils sont distendus par l'air qui ne peut plus être expulsé.",vitals:tt(96,88,24,138,86,36.8),effects:[{target:"poumons",type:"destruction",amount:.85,label:"Emphysème",note:"Les parois alvéolaires se détruisent : moins de surface d'échange et des poumons hypergonflés."},{target:"bronches",type:"obstruction",amount:.55,label:"Obstruction fixe",note:"Bronches épaissies et encombrées de mucus : l'air reste piégé à l'expiration."}],stages:[{label:"Stade précoce",text:"Toux et expectorations, essoufflement seulement à l'effort intense."},{label:"Stade modéré",text:"L'essoufflement limite la marche rapide ; les infections s'aggravent."},{label:"Stade sévère",text:"Dyspnée au moindre effort, hypoxémie chronique et exacerbations fréquentes."}]},{id:"pneumonie",name:"Pneumonie",system:"respiratoire",course:"Aiguë",frequency:"Fréquente",tagline:"Une infection remplit les alvéoles de liquide et de cellules.",description:"La pneumonie est une infection du poumon, le plus souvent bactérienne ou virale. Une zone du poumon s'enflamme et les alvéoles se remplissent d'exsudat, d'où une consolidation visible à la radio.",mechanism:"Les alvéoles remplies de liquide ne peuvent plus échanger les gaz : le sang est moins oxygéné. Fièvre, toux et respiration rapide traduisent la réponse immunitaire et le manque d'oxygène.",symptoms:["Fièvre élevée","Toux grasse","Douleur thoracique","Respiration rapide","Frissons","Fatigue intense","Confusion chez la personne âgée"],causes:["Pneumocoque et autres bactéries","Virus respiratoires","Fausse route chez la personne âgée","Immunodépression"],treatments:["Antibiotiques adaptés","Hydratation et repos","Oxygène si désaturation","Hospitalisation si forme sévère"],prevention:["Vaccination pneumocoque et grippe","Arrêt du tabac","Hygiène des mains","Traiter rapidement une infection respiratoire"],fact:"La pneumonie est l'une des premières causes d'hospitalisation chez les personnes âgées, souvent révélée par une confusion plutôt que de la fièvre.",vitals:tt(110,90,28,104,64,39.2),effects:[{target:"poumons",type:"consolidation",amount:.85,label:"Consolidation",note:"Les alvéoles se remplissent de liquide et de globules blancs : la zone ne participe plus aux échanges gazeux."},{target:"poumons",type:"inflammation",amount:.7,label:"Inflammation infectieuse",note:"Le système immunitaire afflue dans le poumon, provoquant fièvre et douleur."}],stages:[{label:"Début",text:"Fièvre et toux, foyer inflammatoire localisé dans un lobe."},{label:"Extension",text:"La consolidation s'étend, la saturation baisse, la respiration s'accélère."},{label:"Forme sévère",text:"Détresse respiratoire, hypoxémie profonde : oxygène et hospitalisation urgents."}]},{id:"fibrose_pulmonaire",name:"Fibrose pulmonaire",system:"respiratoire",course:"Évolutive",frequency:"Rare",tagline:"Les poumons se cicatrisent de l'intérieur et deviennent rigides.",description:"La fibrose pulmonaire est une maladie évolutive dans laquelle du tissu cicatriciel remplace progressivement les alvéoles. Les poumons perdent leur souplesse et l'échange d'oxygène se dégrade.",mechanism:"Le collagène s'accumule dans les parois alvéolaires, qui s'épaississent. Les poumons deviennent rigides : ils se gonflent mal et se vident mal. La capacité vitale diminue et l'oxygène passe difficilement dans le sang.",symptoms:["Essoufflement croissant","Toux sèche persistante","Fatigue","Extrémités bleutées","Doigts en baguette de tambour","Perte d'appétit"],causes:["Cause idiopathique (inconnue) dans la majorité des cas","Exposition aux poussières (amiante, silice)","Maladies auto-immunes","Antécédents familiaux"],treatments:["Antifibrotiques","Oxygénothérapie","Réhabilitation respiratoire","Greffe pulmonaire dans certains cas"],prevention:["Protéger les poumons au travail","Arrêt du tabac","Suivi médical régulier en cas de facteur de risque"],fact:"On parle de « poumons en nid d'abeille » : au scanner, les zones fibreuses dessinent de petites logettes.",vitals:tt(94,86,26,118,78,36.7),effects:[{target:"poumons",type:"fibrosis",amount:.9,label:"Fibrose",note:"Le tissu souple est remplacé par du collagène rigide : moins de volume, moins d'échanges."}],stages:[{label:"Début",text:"Essoufflement à l'effort important, toux sèche, fibrose localisée."},{label:"Progression",text:"La capacité pulmonaire baisse ; la saturation chute à l'effort."},{label:"Stade avancé",text:"Le poumon est rigide et réduit : oxygène nécessaire, insuffisance respiratoire."}]},{id:"infarctus",name:"Infarctus du myocarde",system:"cardiovasculaire",course:"Aiguë",frequency:"Fréquente",tagline:"Une artère coronaire se bouche : le muscle cardiaque souffre.",description:"L'infarctus survient quand une artère coronaire est soudainement obstruée, le plus souvent par un caillot formé sur une plaque d'athérome. Une partie du muscle cardiaque n'est plus irriguée.",mechanism:"Privées d'oxygène, les cellules du myocarde meurent en quelques heures. Le cœur perd de sa force de contraction, ce qui peut provoquer des troubles du rythme, une chute de tension et une insuffisance cardiaque.",symptoms:["Douleur thoracique serrant (comme un étau)","Douleur irradiant au bras gauche et à la mâchoire","Sueurs froides","Nausées","Essoufflement","Angoisse","Palpitations"],causes:["Athérosclérose","Tabagisme","Diabète et hypertension","Cholestérol élevé","Antécédents familiaux"],treatments:["Appel immédiat au 15","Désobstruction de l'artère (angioplastie)","Antiplaquettaires et anticoagulants","Réadaptation cardiaque"],prevention:["Contrôler la tension et le cholestérol","Ne pas fumer","Activité physique","Alimentation équilibrée"],fact:"Chaque minute de retard à la prise en charge détruit environ 10 millions de cellules cardiaques : « time is muscle ».",vitals:tt(116,93,24,96,62,36.8),effects:[{target:"coronaires",type:"obstruction",amount:.95,label:"Occlusion coronaire",note:"Un caillot bloque l'artère : plus aucun sang n'arrive au muscle en aval."},{target:"coeur",type:"necrosis",amount:.85,label:"Nécrose du myocarde",note:"Les cellules privées d'oxygène meurent et sont remplacées par une cicatrice non contractile."}],stages:[{label:"Ischémie",text:"L'artère se rétrécit ou se bouche : douleur et manque d'oxygène, muscle encore vivant."},{label:"Nécrose",text:"Les cellules meurent ; le cœur perd une partie de sa force de pompe."},{label:"Cicatrice",text:"Le tissu mort est remplacé par une cicatrice fibreuse : risque d'arythmie et d'insuffisance cardiaque."}]},{id:"insuffisance_cardiaque",name:"Insuffisance cardiaque",system:"cardiovasculaire",course:"Chronique",frequency:"Fréquente",tagline:"Un cœur trop faible pour répondre à la demande du corps.",description:"L'insuffisance cardiaque désigne l'incapacité du cœur à éjecter suffisamment de sang. Le sang stagne en amont, dans les poumons ou les veines, et les organes sont moins bien perfusés.",mechanism:"Le débit cardiaque baisse. La pression remonte dans les poumons, où du liquide s'infiltre (œdème pulmonaire), et dans les jambes (œdèmes). Le corps compense en accélérant le cœur et en retenant du sel et de l'eau.",symptoms:["Essoufflement à l'effort puis allongé","Œdèmes des chevilles","Fatigue","Prise de poids rapide","Toux nocturne","Palpitations","Besoin d'uriner la nuit"],causes:["Infarctus ancien","Hypertension non traitée","Valvulopathies","Cardiomyopathie","Troubles du rythme"],treatments:["Diurétiques","Médicaments qui protègent le cœur","Restriction de sel","Suivi du poids quotidien"],prevention:["Traiter l'hypertension","Arrêt du tabac et de l'alcool","Activité physique adaptée","Surveiller les symptômes"],fact:"Un œdème pulmonaire aigu peut se manifester par une sensation d'étouffement la nuit : le patient doit s'asseoir pour respirer.",vitals:tt(102,91,24,104,68,36.6),effects:[{target:"coeur",type:"hypertrophy",amount:.7,label:"Dilatation & hypertrophie",note:"Le cœur se fatigue, se dilate et épaissit ses parois pour compenser, mais devient moins efficace."},{target:"poumons",type:"edema",amount:.8,label:"Œdème pulmonaire",note:"Le liquide s'accumule dans les alvéoles et gêne les échanges : le sang est mal oxygéné."}],stages:[{label:"Compensé",text:"Le cœur compense, essoufflement seulement à l'effort soutenu."},{label:"Décompensé",text:"Œdèmes, fatigue, essoufflement dès la marche ; le sang stagne en amont."},{label:"Sévère",text:"Œdème pulmonaire, orthopnée, hypoxémie : hospitalisation nécessaire."}]},{id:"hypertension",name:"Hypertension artérielle",system:"cardiovasculaire",course:"Chronique",frequency:"Très fréquente",tagline:"Une pression trop élevée qui fatigue cœur, reins et cerveau.",description:"L'hypertension est une pression artérielle durablement supérieure à 140/90 mmHg. Elle reste souvent silencieuse, mais abîme progressivement les artères et les organes.",mechanism:"La paroi des artères subit une pression excessive : elle s'épaissit et perd son élasticité. Le cœur doit pomper plus fort, ce qui l'hypertrophie. Les petits vaisseaux des reins, de la rétine et du cerveau souffrent.",symptoms:["Souvent aucune","Maux de tête","Vertiges","Saignements de nez","Fatigue","Vision floue dans les formes sévères"],causes:["Hérédité","Sel excessif","Surpoids","Alcool et tabac","Stress chronique","Maladie rénale ou endocrinienne"],treatments:["Antihypertenseurs","Réduction du sel","Perte de poids","Activité physique"],prevention:["Mesurer sa tension régulièrement","Limiter le sel et l'alcool","Bouger 30 minutes par jour","Dormir suffisamment"],fact:"On l'appelle le « tueur silencieux » : elle peut rester sans symptôme pendant des années tout en endommageant les organes.",vitals:tt(82,98,16,172,106,36.7),effects:[{target:"coeur",type:"hypertrophy",amount:.65,label:"Hypertrophie cardiaque",note:"Le cœur pompe contre une pression élevée : ses parois s'épaississent et se raidissent."},{target:"aorte",type:"wear",amount:.6,label:"Artères rigidifiées",note:"Les artères perdent leur élasticité et s'abîment, favorisant l'athérosclérose et les anévrismes."}],stages:[{label:"Silencieuse",text:"Pression élevée sans symptôme ; les artères commencent à s'épaissir."},{label:"Retentissement",text:"Hypertrophie du cœur, micro-lésions rénales et rétiniennes."},{label:"Complications",text:"Risque d'AVC, d'infarctus, d'insuffisance rénale et cardiaque."}]},{id:"avc",name:"Accident vasculaire cérébral",system:"nerveux",course:"Aiguë",frequency:"Fréquente",tagline:"Une artère du cerveau se bouche ou se rompt : des neurones meurent.",description:"L'AVC prive soudainement une région du cerveau de sang, soit par obstruction (85 %), soit par hémorragie. Les fonctions contrôlées par cette zone sont perdues en quelques minutes.",mechanism:"Sans oxygène, les neurones s'épuisent et meurent, ainsi que les cellules voisines. La région touchée ne peut plus commander les muscles ou recevoir les sensations. Plus la reperfusion est rapide, plus on limite les séquelles.",symptoms:["Paralysie soudaine d'un côté du visage","Faiblesse d'un bras ou d'une jambe","Trouble de la parole","Cécité d'un œil","Maux de tête brutaux","Déséquilibre"],causes:["Hypertension","Athérosclérose","Fibrillation auriculaire","Diabète","Tabagisme","Anévrisme rompu"],treatments:["Urgence absolue : appel au 15","Thrombolyse ou thrombectomie","Hospitalisation en unité neurovasculaire","Rééducation"],prevention:["Contrôler la tension","Traiter la fibrillation auriculaire","Arrêter le tabac","Bouger et équilibrer l'alimentation"],fact:"Chaque minute sans traitement, près de 2 millions de neurones sont détruits : c'est l'urgence vitale qui fait perdre le plus de temps.",vitals:tt(92,95,18,186,112,36.9),effects:[{target:"cerveau",type:"hemorrhage",amount:.9,label:"Lésion cérébrale",note:"Une zone du cerveau est privée de sang : les neurones meurent et la fonction correspondante est perdue."},{target:"aorte",type:"plaque",amount:.55,label:"Athérosclérose",note:"Des plaques fragilisent les artères cérébrales et carotidiennes, terrain de l'AVC."}],stages:[{label:"Déficit aigu",text:"Paralysie et trouble du langage apparaissent brutalement ; les neurones souffrent."},{label:"Ischémie étendue",text:"Sans reperfusion, le cœur de la lésion meurt et le déficit s'installe."},{label:"Séquelles",text:"Une partie des fonctions est perdue ; la rééducation peut réorganiser les circuits."}]},{id:"atherosclerose",name:"Athérosclérose",system:"cardiovasculaire",course:"Chronique",frequency:"Très fréquente",tagline:"Des plaques de cholestérol rigidifient les artères.",description:"L'athérosclérose est une inflammation chronique de la paroi des artères. Des dépôts de cholestérol, de cellules immunitaires et de calcium forment des plaques qui réduisent la lumière du vaisseau.",mechanism:"L'endothélium lésé laisse pénétrer les LDL, qui s'oxydent et attirent les macrophages. La plaque grossit, se calcifie, et peut se rompre : un caillot se forme alors et bouche l'artère.",symptoms:["Souvent aucun avant complication","Douleur à l'effort (angine)","Douleurs des jambes à la marche","Tension élevée","Troubles visuels"],causes:["Cholestérol LDL élevé","Tabagisme","Diabète","Hypertension","Hérédité","Mode de vie sédentaire"],treatments:["Statines","Antiplaquettaires","Contrôle de la tension et du diabète","Angioplastie si sténose serrée"],prevention:["Alimentation méditerranéenne","Activité physique régulière","Arrêt du tabac","Dépistage du cholestérol"],fact:"L'athérosclérose commence dès l'adolescence : les premières stries lipidiques apparaissent bien avant les symptômes.",vitals:tt(78,97,14,146,92,36.6),effects:[{target:"aorte",type:"plaque",amount:.9,label:"Plaques d'athérome",note:"Des dépôts de cholestérol et de calcium rétrécissent et rigidifient l'aorte."},{target:"coronaires",type:"plaque",amount:.7,label:"Coronaires sténosées",note:"Les artères du cœur sont rétrécies : le muscle manque d'oxygène à l'effort."}],stages:[{label:"Stries lipidiques",text:"Dépôts naissants dans la paroi, sans rétrécissement ni symptôme."},{label:"Plaque constituée",text:"La lumière de l'artère se réduit, le flux baisse, l'effort devient limitant."},{label:"Plaque compliquée",text:"Rupture ou thrombose : infarctus, AVC ou ischémie des jambes."}]},{id:"parkinson",name:"Maladie de Parkinson",system:"nerveux",course:"Évolutive",frequency:"Fréquente",tagline:"La dopamine manque : le mouvement devient lent et tremblant.",description:"La maladie de Parkinson est une maladie neurodégénérative qui détruit progressivement les neurones producteurs de dopamine de la substance noire, dans le tronc cérébral.",mechanism:"Sans dopamine, les ganglions de la base ne régulent plus correctement les mouvements. Le cerveau compense un temps, puis apparaissent lenteur, rigidité et tremblements. Les circuits de la marche et de l'équilibre sont touchés.",symptoms:["Tremblement de repos","Lenteur des mouvements","Rigidité musculaire","Petits pas, posture voûtée","Visage moins expressif","Troubles du sommeil","Constipation"],causes:["Cause inconnue dans la majorité des cas","Vieillissement et facteurs environnementaux","Rares formes génétiques","Exposition à certains pesticides"],treatments:["Lévodopa","Agonistes dopaminergiques","Rééducation et orthophonie","Stimulation cérébrale profonde dans certains cas"],prevention:["Pas de prévention prouvée","Activité physique régulière","Suivi neurologique précoce"],fact:"Les premiers symptômes apparaissent quand environ 60 à 70 % des neurones dopaminergiques sont déjà détruits : le cerveau compense longtemps.",vitals:tt(76,97,16,128,82,36.6),global:{tremor:.35},effects:[{target:"cerveau",type:"atrophy",amount:.55,label:"Perte de neurones dopaminergiques",note:"La substance noire dégénère : le circuit de contrôle du mouvement manque de dopamine."},{target:"tronc_cerebral",type:"atrophy",amount:.3,label:"Atteinte du tronc cérébral",note:"Les noyaux du tronc cérébral participent à la régulation du mouvement et de l'équilibre."}],stages:[{label:"Début",text:"Tremblement d'un côté, lenteur discrète, perte de l'expression du visage."},{label:"Installation",text:"Rigidité, petits pas, troubles de l'équilibre et de l'écriture."},{label:"Stade avancé",text:"Chutes, blocages de la marche, troubles de la déglutition et de la parole."}]},{id:"alzheimer",name:"Maladie d'Alzheimer",system:"nerveux",course:"Évolutive",frequency:"Fréquente",tagline:"Les souvenirs s'effacent à mesure que les neurones dégénèrent.",description:"Maladie neurodégénérative la plus fréquente, Alzheimer entraîne une perte progressive de la mémoire et des fonctions cognitives. Le cerveau s'atrophie, surtout dans les régions de la mémoire.",mechanism:"Des plaques de protéine bêta-amyloïde s'accumulent entre les neurones et la protéine tau s'agrège à l'intérieur. Les connexions synaptiques se perdent, puis les neurones meurent. L'hippocampe, siège de la mémoire, est touché très tôt.",symptoms:["Oublis récents répétés","Désorientation dans le temps","Difficultés à trouver ses mots","Perte d'initiative","Changements d'humeur","Difficultés à gérer les tâches quotidiennes"],causes:["Âge avancé","Prédisposition génétique (APOE4)","Facteurs vasculaires","Rares formes héréditaires précoces"],treatments:["Médicaments symptomatiques","Stimulation cognitive","Accompagnement de l'entourage","Adaptation de l'environnement"],prevention:["Stimuler le cerveau et les liens sociaux","Bouger régulièrement","Contrôler tension, diabète et cholestérol","Bien dormir"],fact:"L'atrophie cérébrale commence des années avant les premiers oublis : le cerveau compense longtemps avant que les symptômes n'apparaissent.",vitals:tt(72,97,15,132,80,36.5),effects:[{target:"cerveau",type:"atrophy",amount:.85,label:"Atrophie cérébrale",note:"Les neurones et les connexions disparaissent, surtout dans l'hippocampe et le cortex."},{target:"cerveau",type:"demyelination",amount:.4,label:"Plaques amyloïdes",note:"Des dépôts de bêta-amyloïde perturbent la communication entre neurones."}],stages:[{label:"Troubles légers",text:"Oublis récents, difficultés d'organisation, encore compensées."},{label:"Stade modéré",text:"Désorientation, aide nécessaire pour les tâches complexes, changements de comportement."},{label:"Stade avancé",text:"Perte d'autonomie, troubles du langage et de la déglutition, dépendance importante."}]},{id:"sep",name:"Sclérose en plaques",system:"nerveux",course:"Évolutive",frequency:"Rare",tagline:"La gaine protectrice des nerfs est attaquée par le système immunitaire.",description:"La sclérose en plaques (SEP) est une maladie auto-immune qui détruit la myéline, la gaine isolante des fibres nerveuses du cerveau et de la moelle épinière.",mechanism:"Sans myéline, les messages nerveux se propagent mal ou sont bloqués. Les zones démyélinisées forment des « plaques » visibles à l'IRM. Les symptômes dépendent des faisceaux touchés et évoluent par poussées.",symptoms:["Fatigue intense","Troubles de la sensibilité","Faiblesse d'un membre","Troubles visuels","Troubles de l'équilibre","Problèmes urinaires","Fourmillements"],causes:["Maladie auto-immune multifactorielle","Prédisposition génétique","Facteurs environnementaux (vitamine D, virus)","Tabagisme"],treatments:["Traitements de fond immunomodulateurs","Corticoïdes lors des poussées","Rééducation","Traitement des symptômes"],prevention:["Pas de prévention certaine","Éviter le tabac","Maintenir une activité physique adaptée","Suivi spécialisé"],fact:"La SEP touche environ 2 à 3 fois plus de femmes que d'hommes et débute souvent entre 20 et 40 ans.",vitals:tt(82,97,16,122,78,36.8),effects:[{target:"moelle_epiniere",type:"demyelination",amount:.9,label:"Plaques de démyélinisation",note:"La gaine de myéline est détruite : les messages moteurs et sensitifs passent mal."},{target:"cerveau",type:"demyelination",amount:.45,label:"Lésions cérébrales",note:"Des plaques disséminées perturbent la vision, la coordination et la cognition."}],stages:[{label:"Poussée",text:"Fourmillements, fatigue ou trouble visuel apparaissent puis régressent souvent."},{label:"Lésions accumulées",text:"Les plaques se multiplient ; la récupération est plus lente et incomplète."},{label:"Forme progressive",text:"Le handicap s'installe, avec troubles moteurs, urinaires et de l'équilibre."}]},{id:"epilepsie",name:"Épilepsie",system:"nerveux",course:"Chronique",frequency:"Fréquente",tagline:"Une décharge électrique anormale envahit le cerveau.",description:"L'épilepsie est une affection neurologique caractérisée par des crises récurrentes, dues à une activité électrique excessive et désorganisée d'un groupe de neurones.",mechanism:"Les neurones s'activent de façon synchrone et incontrôlée. La décharge peut rester locale (crise focale) ou se propager aux deux hémisphères (crise généralisée). Le cerveau ne peut plus assumer ses fonctions pendant la crise.",symptoms:["Crises convulsives","Absences (regard vide)","Perte de conscience","Sensations étranges avant la crise","Confusion après la crise","Mouvements involontaires"],causes:["Souvent inconnue","Lésion cérébrale ou AVC ancien","Prédisposition génétique","Tumeur, infection ou traumatisme crânien","Sevrage alcoolique"],treatments:["Antiépileptiques","Chirurgie dans certains cas","Régime cétogène (formes particulières)","Éviter les déclencheurs"],prevention:["Pas de prévention universelle","Protéger la tête (casque, sécurité routière)","Traiter les infections du système nerveux","Bien suivre le traitement"],fact:"Pendant une crise généralisée, le cerveau consomme énormément d'énergie : la fatigue qui suit peut durer plusieurs jours.",vitals:tt(90,96,18,126,80,37),effects:[{target:"cerveau",type:"hyperactivity",amount:.85,label:"Décharge électrique",note:"Des neurones s'emballent simultanément : l'activité électrique désorganisée perturbe tout le cerveau."}],stages:[{label:"Crise focale",text:"Une zone cérébrale s'active anormalement : sensation étrange, mouvement involontaire."},{label:"Généralisation",text:"La décharge s'étend aux deux hémisphères avec perte de conscience et convulsions."},{label:"État de mal",text:"Les crises s'enchaînent sans récupération : urgence médicale."}]},{id:"rgo",name:"Reflux gastro-œsophagien",system:"digestif",course:"Chronique",frequency:"Très fréquente",tagline:"L'acide de l'estomac remonte et irrite l'œsophage.",description:"Le RGO survient quand le contenu acide de l'estomac remonte dans l'œsophage, le plus souvent à cause d'un sphincter cardiaque qui ferme mal.",mechanism:"L'œsophage n'a pas de protection contre l'acide. Les remontées répétées enflamment sa muqueuse (œsophagite), provoquent brûlures et toux. À long terme, l'acidité peut modifier les cellules (endobrachyœsophage).",symptoms:["Brûlures derrière le sternum","Régurgitations acides","Toux chronique","Enrouement","Goût amer","Aggravation couché"],causes:["Relâchement du sphincter inférieur de l'œsophage","Surpoids","Repas copieux et gras","Alcool, tabac, café","Grossesse","Hernie hiatale"],treatments:["Inhibiteurs de la pompe à protons","Antiacides","Surélévation de la tête du lit","Perte de poids","Chirurgie antireflux si nécessaire"],prevention:["Éviter les repas tardifs","Limiter alcool, café et plats gras","Ne pas fumer","Manger lentement"],fact:"Le RGO touche environ 10 à 20 % de la population dans les pays occidentaux, mais tout le monde ne développe pas d'œsophagite.",vitals:tt(78,98,14,122,80,36.7),effects:[{target:"oesophage",type:"inflammation",amount:.8,label:"Œsophagite",note:"La muqueuse de l'œsophage est brûlée par l'acide : rougeur, douleur et parfois ulcération."},{target:"estomac",type:"inflammation",amount:.35,label:"Hyperacidité",note:"L'estomac produit trop d'acide ou se vide mal, entretenant les remontées."}],stages:[{label:"Reflux simple",text:"Brûlures occasionnelles après les repas, muqueuse encore saine."},{label:"Œsophagite",text:"Inflammation visible de la muqueuse, douleurs plus fréquentes."},{label:"Complication",text:"Ulcération, rétrécissement ou modification des cellules (endobrachyœsophage)."}]},{id:"ulcere",name:"Ulcère gastrique",system:"digestif",course:"Aiguë",frequency:"Fréquente",tagline:"La paroi de l'estomac se creuse jusqu'à former une plaie.",description:"Un ulcère gastrique est une plaie profonde de la muqueuse de l'estomac. Il survient quand l'acidité et la pepsine dépassent les défenses de la paroi, souvent en lien avec Helicobacter pylori ou les anti-inflammatoires.",mechanism:"La muqueuse est fragilisée : l'acide creuse une lésion qui peut atteindre les vaisseaux. La douleur survient souvent à jeun et s'apaise en mangeant. Une perforation ou une hémorragie est une urgence.",symptoms:["Douleur épigastrique à jeun","Nausées","Ballonnements","Selles noires si saignement","Vomissements de sang","Perte d'appétit"],causes:["Helicobacter pylori","Anti-inflammatoires (AINS)","Tabagisme","Alcool","Stress intense et jeûne prolongé"],treatments:["Antibiotiques contre H. pylori","Inhibiteurs de la pompe à protons","Arrêt des AINS","Endoscopie et traitement d'hémostase"],prevention:["Limiter les AINS sans protection","Ne pas fumer","Dépister H. pylori","Gérer le stress et l'alimentation"],fact:"On a longtemps cru que l'ulcère était causé par le stress seul. La découverte d'Helicobacter pylori a valu le prix Nobel de médecine en 2005.",vitals:tt(94,97,16,110,70,37.1),effects:[{target:"estomac",type:"necrosis",amount:.7,label:"Plaie de la muqueuse",note:"Une perte de substance creuse la paroi gastrique ; l'acide entretient la lésion."},{target:"estomac",type:"hemorrhage",amount:.4,label:"Risque hémorragique",note:"L'ulcère peut éroder un vaisseau et provoquer un saignement digestif."}],stages:[{label:"Ulcération superficielle",text:"Douleurs à jeun, lésion limitée à la muqueuse."},{label:"Ulcère profond",text:"La plaie atteint la sous-muqueuse ; risque de saignement."},{label:"Complication",text:"Hémorragie ou perforation : douleur brutale, urgence chirurgicale."}]},{id:"cirrhose",name:"Cirrhose",system:"digestif",course:"Évolutive",frequency:"Fréquente",tagline:"Le foie se fibrose, se déforme et perd ses fonctions.",description:"La cirrhose est le stade avancé de nombreuses maladies du foie (alcool, hépatites, stéatose). Le tissu hépatique est remplacé par de la fibrose et des nodules, ce qui déforme l'organe.",mechanism:"La fibrose comprime les vaisseaux et les canaux biliaires. Le foie ne filtre plus correctement, la bile stagne, la pression dans la veine porte augmente (varices, ascite). Les toxines s'accumulent.",symptoms:["Fatigue","Jaunisse","Ventre gonflé (ascite)","Œdèmes des jambes","Confusion","Saignements faciles","Démangeaisons"],causes:["Alcool chronique","Hépatites virales B ou C","Stéatose hépatique métabolique","Maladies auto-immunes du foie","Hémochromatose"],treatments:["Arrêt total de l'alcool","Traitement de la cause","Diurétiques et régime adapté","Surveillance des varices","Greffe dans les formes avancées"],prevention:["Limiter l'alcool","Vaccination hépatite B","Dépistage des hépatites","Contrôler poids et diabète"],fact:"Le foie cicatrisé se déforme en nodules et devient dur ; à un stade avancé, il ne peut plus fabriquer assez de protéines ni filtrer les toxines.",vitals:tt(88,96,16,106,64,37.3),global:{skin:"#e8c65c"},effects:[{target:"foie",type:"fibrosis",amount:.92,label:"Fibrose hépatique",note:"Le tissu fonctionnel est remplacé par du tissu cicatriciel : filtration et synthèse s'effondrent."},{target:"foie",type:"atrophy",amount:.5,label:"Foie déformé",note:"L'architecture du foie est détruite par les nodules ; le sang portal circule mal."}],stages:[{label:"Fibrose débutante",text:"Le foie se cicatrise discrètement, encore compensé, souvent sans symptôme."},{label:"Cirrhose constituée",text:"Nodules et fibrose déforment le foie ; fatigue et jaunisse apparaissent."},{label:"Décompensation",text:"Ascite, hémorragies digestives, confusion (encéphalopathie) : pronostic sévère."}]},{id:"crohn",name:"Maladie de Crohn",system:"digestif",course:"Chronique",frequency:"Rare",tagline:"Une inflammation immunitaire attaque par plaques le tube digestif.",description:"La maladie de Crohn est une maladie inflammatoire chronique de l'intestin. Elle peut toucher n'importe quelle partie du tube digestif, souvent l'iléon terminal et le côlon, par segments séparés par des zones saines.",mechanism:"Le système immunitaire attaque la paroi intestinale, créant ulcères, œdème et épaississement. L'absorption des nutriments est altérée et des fistules peuvent se former entre anses intestinales.",symptoms:["Douleurs abdominales","Diarrhées chroniques","Fatigue","Perte de poids","Fièvre","Ulcères de la bouche","Fissures anales"],causes:["Prédisposition génétique","Dysrégulation immunitaire","Facteurs environnementaux","Microbiote intestinal perturbé","Tabagisme"],treatments:["Anti-inflammatoires et immunosuppresseurs","Biothérapies","Nutrition adaptée","Chirurgie si complications"],prevention:["Pas de prévention certaine","Arrêter le tabac","Suivi gastro-entérologique régulier","Alimentation personnalisée"],fact:"La maladie évolue par poussées et rémissions : on peut vivre des années sans symptôme entre deux épisodes.",vitals:tt(98,97,16,108,68,38.1),effects:[{target:"intestin_grele",type:"inflammation",amount:.9,label:"Iléite",note:"La paroi de l'intestin grêle s'enflamme, s'épaissit et s'ulcère : l'absorption diminue."},{target:"colon",type:"inflammation",amount:.45,label:"Colite segmentaire",note:"Des segments du côlon sont enflammés, avec diarrhées et douleurs."}],stages:[{label:"Poussée légère",text:"Douleurs et diarrhées intermittentes, inflammation limitée."},{label:"Poussée modérée",text:"Ulcères et œdème de la paroi, perte de poids, fatigue importante."},{label:"Complication",text:"Sténose, fistule ou abcès : risque d'occlusion et de chirurgie."}]},{id:"calculs_biliaires",name:"Calculs biliaires",system:"digestif",course:"Aiguë",frequency:"Très fréquente",tagline:"Des pierres de cholestérol bloquent la vésicule.",description:"Les calculs biliaires sont des cristaux de cholestérol ou de pigment qui se forment dans la vésicule. Souvent silencieux, ils peuvent bloquer le canal cystique et provoquer une crise de colique hépatique.",mechanism:"La bile trop concentrée en cholestérol cristallise. Un calcul coincé dans le collet de la vésicule provoque une douleur intense sous les côtes droites, surtout après un repas gras.",symptoms:["Douleur sous les côtes droites","Douleur après repas gras","Nausées","Vomissements","Fièvre si infection","Jaunisse si obstruction du canal"],causes:["Sexe féminin et grossesse","Âge et obésité","Régime riche en graisses","Perte de poids rapide","Antécédents familiaux"],treatments:["Antalgiques","Ablation de la vésicule (cholécystectomie) si récidives","Antibiotiques en cas de cholécystite","Régime pauvre en graisses pendant la crise"],prevention:["Alimentation équilibrée","Activité physique","Perte de poids progressive","Hydratation suffisante"],fact:"Environ 10 à 15 % des adultes ont des calculs biliaires, mais la majorité ne ressentent jamais rien.",vitals:tt(88,98,15,120,76,37.2),effects:[{target:"vesicule",type:"stone",amount:.9,label:"Calculs",note:"Des pierres obstruent la vésicule ou le canal biliaire et bloquent l'écoulement de la bile."},{target:"vesicule",type:"inflammation",amount:.6,label:"Cholécystite",note:"La bile bloquée enflamme et infecte la paroi de la vésicule."}],stages:[{label:"Calculs silencieux",text:"Les pierres sont présentes mais ne bloquent rien."},{label:"Colique hépatique",text:"Un calcul se coince : douleur violente et nausées."},{label:"Cholécystite",text:"L'inflammation s'installe avec fièvre ; risque de perforation."}]},{id:"pancreatite",name:"Pancréatite aiguë",system:"digestif",course:"Aiguë",frequency:"Fréquente",tagline:"Le pancréas s'autodigère et s'enflamme violemment.",description:"La pancréatite aiguë est une inflammation brutale du pancréas, souvent déclenchée par un calcul biliaire ou l'alcool. Les enzymes digestives s'activent dans la glande et attaquent ses propres tissus.",mechanism:"Les enzymes normalement libérées dans l'intestin s'activent trop tôt dans le pancréas. L'inflammation se propage, les vaisseaux fuient, et des complications locales (nécrose, kyste) peuvent survenir.",symptoms:["Douleur abdominale intense en ceinture","Nausées et vomissements","Fièvre","Ventre ballonné","Arrêt du transit","Douleur irradiant au dos"],causes:["Calculs biliaires","Alcool","Hypertriglycéridémie","Médicaments","Traumatisme","Causes génétiques"],treatments:["Hospitalisation et jeûne","Réhydratation intraveineuse","Antalgiques puissants","Traitement de la cause (bile, alcool)","Chirurgie si nécrose infectée"],prevention:["Limiter l'alcool","Traiter les calculs biliaires","Contrôler les triglycérides","Éviter les médicaments à risque"],fact:"Le pancréas produit des enzymes capables de digérer les protéines : dans la pancréatite, elles digèrent l'organe lui-même.",vitals:tt(106,96,20,100,62,38.4),effects:[{target:"pancreas",type:"inflammation",amount:.9,label:"Pancréatite",note:"Le pancréas est le siège d'une inflammation majeure ; les enzymes digestives attaquent le tissu."},{target:"estomac",type:"inflammation",amount:.25,label:"Irritation digestive",note:"L'inflammation locale et l'arrêt du transit irritent l'estomac et le tube digestif."}],stages:[{label:"Début",text:"Douleur brutale, vomissements, élévation des enzymes pancréatiques."},{label:"Inflammation étendue",text:"Œdème et fuite de liquide autour du pancréas, syndrome inflammatoire."},{label:"Nécrose",text:"Des zones du pancréas se nécrosent ; risque d'infection et de défaillance multiviscérale."}]},{id:"insuffisance_renale",name:"Insuffisance rénale",system:"urinaire",course:"Évolutive",frequency:"Fréquente",tagline:"Les reins filtrent de moins en moins : les toxines s'accumulent.",description:"L'insuffisance rénale chronique est la perte progressive des capacités de filtration des reins. Elle est souvent liée au diabète et à l'hypertension, et reste longtemps silencieuse.",mechanism:"Les néphrons sont détruits progressivement et remplacés par du tissu fibreux. Les reins ne peuvent plus éliminer l'urée et la créatinine, ni équilibrer l'eau, le potassium et la tension. L'anémie et l'atteinte osseuse s'installent.",symptoms:["Fatigue","Œdèmes","Urines moins abondantes","Démangeaisons","Nausées","Essoufflement","Tension élevée"],causes:["Diabète","Hypertension","Glomérulonéphrites","Maladies génétiques (polykystose)","Médicaments néphrotoxiques"],treatments:["Contrôle de la tension et du diabète","Régime adapté","Médicaments protecteurs","Dialyse ou greffe au stade terminal"],prevention:["Dépister tôt le diabète et l'hypertension","Ne pas abuser des anti-inflammatoires","S'hydrater","Suivi de la fonction rénale"],fact:"On peut vivre normalement avec un seul rein : la perte de fonction devient symptomatique quand il ne reste qu'environ 10 à 15 % de la capacité.",vitals:tt(92,96,18,158,96,36.7),effects:[{target:"reins",type:"atrophy",amount:.9,label:"Atrophie rénale",note:"Les néphrons sont détruits : les reins se rétractent et filtrent beaucoup moins."},{target:"reins",type:"fibrosis",amount:.5,label:"Fibrose interstitielle",note:"Le tissu cicatriciel remplace les unités fonctionnelles du rein."},{target:"coeur",type:"hypertrophy",amount:.3,label:"Retentissement cardiaque",note:"La tension et la rétention hydrosodée fatiguent le cœur."}],stages:[{label:"Stade débutant",text:"Filtration légèrement réduite, sans symptôme ; biologie anormale."},{label:"Stade modéré",text:"Fatigue, tension, œdèmes ; l'anémie et les troubles osseux apparaissent."},{label:"Stade terminal",text:"Les toxines s'accumulent : dialyse ou greffe deviennent nécessaires."}]},{id:"calculs_renaux",name:"Calculs rénaux",system:"urinaire",course:"Aiguë",frequency:"Très fréquente",tagline:"Un caillou bloque l'uretère et déclenche une douleur atroce.",description:"Les calculs rénaux sont des cristaux formés dans les voies urinaires, surtout à base de calcium. Lorsqu'un calcul migre dans l'uretère, il bloque l'urine et provoque une colique néphrétique.",mechanism:"En s'engageant dans l'uretère, le calcul crée un obstacle. La pression remonte dans le rein, l'uretère se contracte violemment : douleur en vague, sang dans les urines, parfois infection.",symptoms:["Douleur lombaire intense","Douleur irradiant vers l'aine","Sang dans les urines","Nausées","Envies fréquentes d'uriner","Fièvre si infection"],causes:["Déshydratation","Alimentation riche en sel et en oxalates","Antécédents personnels ou familiaux","Certaines maladies métaboliques","Medicaments"],treatments:["Antalgiques et anti-inflammatoires","Hydratation","Élimination spontanée souvent","Lithotritie ou endoscopie si blocage","Antibiotiques si infection"],prevention:["Boire 2 litres d'eau par jour","Limiter le sel","Éviter les excès d'oxalates","Suivre la composition du calcul"],fact:"La colique néphrétique est l'une des douleurs les plus intenses connues : certains patients la comparent à un accouchement.",vitals:tt(100,98,16,142,88,36.9),effects:[{target:"reins",type:"stone",amount:.9,label:"Calcul rénal",note:"Le calcul irrite le rein et peut bloquer l'écoulement de l'urine."},{target:"ureteres",type:"obstruction",amount:.5,label:"Obstruction de l'uretère",note:"Le calcul coince dans l'uretère : l'urine s'accumule en amont et distend le rein."}],stages:[{label:"Calcul silencieux",text:"Le calcul reste dans le rein sans provoquer de douleur."},{label:"Migration",text:"Il s'engage dans l'uretère : colique néphrétique et sang dans les urines."},{label:"Obstruction",text:"L'urine bloquée dilate le rein ; risque d'infection et de perte de fonction."}]},{id:"cystite",name:"Cystite",system:"urinaire",course:"Aiguë",frequency:"Très fréquente",tagline:"Une infection urinaire enflamme la vessie.",description:"La cystite est une inflammation de la vessie, le plus souvent causée par une bactérie intestinale remontant par l'urètre, surtout Escherichia coli.",mechanism:"Les bactéries adhèrent à la paroi de la vessie et déclenchent une inflammation. La muqueuse devient rouge et irritée, ce qui provoque brûlures et envies fréquentes. L'infection ne touche généralement pas les reins.",symptoms:["Brûlures en urinant","Envies fréquentes","Urines troubles","Douleur pelvienne","Urines malodorantes","Sang dans les urines"],causes:["Bactéries intestinales","Rapports sexuels","Faible consommation d'eau","Retention d'urine","Ménopause","Sonde urinaire"],treatments:["Antibiotiques courts","Hydratation","Antalgiques","Consultation si fièvre ou douleur lombaire"],prevention:["Boire suffisamment","Uriner après les rapports","Essuyer d'avant en arrière","Ne pas retenir ses urines"],fact:"La cystite est beaucoup plus fréquente chez la femme car l'urètre est court, ce qui facilite la remontée des bactéries.",vitals:tt(86,98,15,118,74,37.8),effects:[{target:"vessie",type:"inflammation",amount:.9,label:"Cystite",note:"La muqueuse vésicale est enflammée par les bactéries : brûlures et contractions douloureuses."}],stages:[{label:"Début",text:"Brûlures et envies fréquentes, urines encore claires."},{label:"Cystite déclarée",text:"Inflammation marquée, urines troubles et douleurs pelviennes."},{label:"Extension",text:"Fièvre ou douleur lombaire : l'infection peut gagner les reins (pyélonéphrite)."}]},{id:"osteoporose",name:"Ostéoporose",system:"squelettique",course:"Évolutive",frequency:"Très fréquente",tagline:"L'os se creuse et devient fragile, souvent sans bruit.",description:"L'ostéoporose est une perte progressive de la densité osseuse. Les os deviennent poreux et fragiles, ce qui augmente le risque de fractures, notamment du col du fémur, des vertèbres et du poignet.",mechanism:"Après 30 ans, la destruction osseuse dépasse la formation. La trame osseuse s'amincit et se fragilise. Une chute banale peut alors casser une hanche ou tasser une vertèbre.",symptoms:["Souvent aucun symptôme","Perte de taille","Dos voûté","Douleurs dorsales","Fractures faciles","Fracture du poignet"],causes:["Vieillissement et ménopause","Carence en calcium et vitamine D","Sédentarité","Tabac et alcool","Corticoïdes au long cours","Antécédents familiaux"],treatments:["Bisphosphonates et autres traitements","Calcium et vitamine D","Activité physique avec mise en charge","Prévention des chutes"],prevention:["Apports suffisants en calcium","Vitamine D et exposition au soleil","Exercice physique régulier","Arrêter le tabac","Densitométrie après 65 ans"],fact:"L'os est un tissu vivant : il se renouvelle en permanence. Avec l'âge, la balance penche vers la perte, surtout après la ménopause.",vitals:tt(76,98,14,126,80,36.6),effects:[{target:"femur",type:"porosity",amount:.85,label:"Fragilité fémorale",note:"La trame de l'os se raréfie : le col du fémur devient très vulnérable aux chutes."},{target:"colonne",type:"porosity",amount:.8,label:"Tassements vertébraux",note:"Les vertèbres perdent de la densité et peuvent s'écraser, entraînant une perte de taille."},{target:"bassin",type:"porosity",amount:.7,label:"Os iliaques fragilisés",note:"Le bassin devient plus fragile, avec un risque accru de fracture."}],stages:[{label:"Ostéopénie",text:"Densité osseuse en baisse, sans fracture ; période d'action idéale."},{label:"Ostéoporose",text:"Os poreux, fractures vertébrales possibles, perte de taille."},{label:"Fractures sévères",text:"Fracture du col du fémur ou tassements multiples : perte d'autonomie."}]},{id:"arthrose",name:"Arthrose",system:"squelettique",course:"Chronique",frequency:"Très fréquente",tagline:"Le cartilage s'use et l'articulation s'enflamme.",description:"L'arthrose est une maladie dégénérative de l'articulation. Le cartilage qui recouvre les os s'amincit, puis l'os réagit et l'inflammation s'installe, surtout aux genoux, aux hanches et aux doigts.",mechanism:"Sous les contraintes répétées, le cartilage perd ses protéoglycanes et s'effrite. Les os frottent, se densifient et forment des ostéophytes (béances). La douleur apparaît à l'effort puis au repos.",symptoms:["Douleur à l'effort","Raideur matinale","Craquements","Gonflement articulaire","Perte de mobilité","Déformation des doigts"],causes:["Âge et usure","Surpoids","Ancien traumatisme","Prédisposition génétique","Métiers physiques"],treatments:["Activité physique adaptée","Antalgiques et anti-inflammatoires","Kinésithérapie","Injections de corticoïdes","Prothèse si handicap majeur"],prevention:["Maintenir un poids santé","Renforcer les muscles autour des articulations","Éviter les gestes répétitifs","Bouger sans excès"],fact:"Le cartilage n'a ni vaisseaux ni nerfs : il se nourrit par le mouvement. Une articulation immobile s'abîme plus vite.",vitals:tt(78,98,14,130,82,36.7),effects:[{target:"rotule",type:"wear",amount:.85,label:"Cartilage usé",note:"Le cartilage s'amincit derrière la rotule : le genou craque et fait mal en montant les escaliers."},{target:"femur",type:"wear",amount:.75,label:"Articulation de la hanche",note:"L'espace articulaire se réduit ; l'os réagit et la mobilité diminue."},{target:"colonne",type:"wear",amount:.5,label:"Arthrose vertébrale",note:"Les disques et articulations du dos s'usent, provoquant raideur et douleurs."}],stages:[{label:"Gêne mécanique",text:"Douleurs à l'effort, cartilage encore présent, raideur légère."},{label:"Usure installée",text:"Cartilage aminci, craquements, douleurs plus fréquentes et gonflements."},{label:"Articulation détruite",text:"L'os frotte, la mobilité se limite fortement ; prothèse parfois nécessaire."}]},{id:"scoliose",name:"Scoliose",system:"squelettique",course:"Évolutive",frequency:"Fréquente",tagline:"La colonne se courbe et tourne en trois dimensions.",description:"La scoliose est une déformation tridimensionnelle de la colonne vertébrale : elle se courbe latéralement et les vertèbres tournent. Elle apparaît souvent à l'adolescence.",mechanism:"La croissance asymétrique des vertèbres et des disques accentue la courbure. Les côtes suivent la rotation et le thorax se déforme. Selon l'ampleur, la fonction respiratoire peut être affectée.",symptoms:["Épaules asymétriques","Omoplate saillante","Bassin décalé","Douleurs dorsales","Vêtements qui tombent mal","Bosse costale"],causes:["Scoliose idiopathique (la plus fréquente)","Prédisposition familiale","Malformation vertébrale","Maladie neuromusculaire","Inégalité de longueur des jambes"],treatments:["Surveillance pendant la croissance","Corset si courbure évolutive","Kinésithérapie spécifique","Chirurgie pour les courbures sévères"],prevention:["Dépistage clinique à l'adolescence","Activité physique régulière","Suivi de la croissance","Consulter si asymétrie visible"],fact:"Une scoliose n'est pas causée par une mauvaise posture ou un cartable trop lourd ; la majorité des cas sont idiopathiques.",vitals:tt(74,98,15,120,76,36.8),effects:[{target:"colonne",type:"scoliosis",amount:.75,label:"Courbure vertébrale",note:"La colonne se courbe et pivote : les côtes et le bassin se désalignent."}],stages:[{label:"Courbure légère",text:"Asymétrie discrète des épaules, colonne légèrement déviée."},{label:"Courbure modérée",text:"La déformation progresse pendant la croissance ; un corset peut être proposé."},{label:"Courbure sévère",text:"Le thorax se déforme ; la respiration et la posture peuvent être affectées."}]},{id:"fracture_femur",name:"Fracture du fémur",system:"squelettique",course:"Aiguë",frequency:"Fréquente",tagline:"L'os le plus solide cède : la hanche ne porte plus.",description:"La fracture du col du fémur touche surtout les personnes âgées après une chute, ou les sujets jeunes lors d'un traumatisme important. Le fémur ne peut alors plus transmettre le poids du corps.",mechanism:"La solution de continuité de l'os provoque douleur intense, impossibilité de poser le pied et raccourcissement du membre. La chirurgie (ostéosynthèse ou prothèse) est souvent nécessaire pour permettre la marche.",symptoms:["Douleur vive à la hanche","Impossibilité de marcher","Jambe tournée vers l'extérieur","Raccourcissement apparent","Gonflement","Hématome"],causes:["Chute chez la personne âgée","Ostéoporose","Traumatisme de la route ou du sport","Tumeur osseuse (rare)","Fragilité osseuse"],treatments:["Chirurgie rapide","Antalgiques","Prévention des phlébites","Rééducation précoce","Prise en charge de la chute"],prevention:["Prévenir les chutes à domicile","Traiter l'ostéoporose","Renforcer l'équilibre et les muscles","Corriger la vue"],fact:"Chez la personne âgée, une fracture du col du fémur est une urgence : l'alitement prolongé augmente fortement les complications.",vitals:tt(102,98,18,132,86,36.9),effects:[{target:"femur",type:"fracture",amount:.9,label:"Fracture du col",note:"L'os est rompu et déplacé : le membre ne peut plus supporter le poids du corps."}],stages:[{label:"Fracture stable",text:"L'os est cassé mais les fragments restent alignés."},{label:"Déplacement",text:"Les fragments se décalent, la jambe se raccourcit et tourne."},{label:"Complication",text:"Risque de nécrose de la tête fémorale, de phlébite et de complications liées à l'alitement."}]},{id:"dystrophie",name:"Dystrophie musculaire",system:"musculaire",course:"Évolutive",frequency:"Rare",tagline:"Les muscles s'atrophient à cause d'un défaut génétique.",description:"Les dystrophies musculaires regroupent des maladies génétiques qui fragilisent progressivement les fibres musculaires. La plus fréquente, Duchenne, touche les garçons dans la petite enfance.",mechanism:"Une protéine qui stabilise la membrane des fibres musculaires manque (dystrophine dans Duchenne). Les fibres se déchirent à chaque contraction, sont remplacées par du gras et du tissu fibreux, et le muscle fond.",symptoms:["Faiblesse musculaire progressive","Chutes fréquentes","Difficulté à monter les escaliers","Démarche dandinante","Atrophie des cuisses","Troubles respiratoires"],causes:["Mutation génétique (souvent liée au chromosome X)","Antécédents familiaux","Formes sporadiques possibles"],treatments:["Kinésithérapie et maintien de la mobilité","Corticoïdes dans certaines formes","Assistance respiratoire","Appareillage, fauteuil","Recherche génétique"],prevention:["Conseil génétique familial","Dépistage néonatal dans certaines formes","Suivi pédiatrique précoce"],fact:"Dans la dystrophie de Duchenne, les muscles semblent parfois volumineux, mais ils sont remplacés par de la graisse et du tissu fibreux.",vitals:tt(88,97,18,118,76,36.8),effects:[{target:"quadriceps",type:"atrophy",amount:.85,label:"Atrophie des cuisses",note:"Les fibres musculaires dégénèrent : le muscle perd du volume et de la force."},{target:"fessiers",type:"atrophy",amount:.75,label:"Faiblesse du bassin",note:"Les muscles fessiers s'affaiblissent, ce qui rend la marche et le lever difficiles."},{target:"deltoides",type:"atrophy",amount:.7,label:"Atrophie des épaules",note:"Les bras perdent de la force ; lever les objets devient compliqué."},{target:"pectoraux",type:"atrophy",amount:.6,label:"Faiblesse du tronc",note:"Les muscles du tronc participent aussi à la respiration, d'où un risque respiratoire."}],stages:[{label:"Début",text:"Faiblesse des jambes, chutes et difficultés à courir."},{label:"Perte de marche",text:"L'atrophie progresse ; la marche devient difficile et l'aide technique nécessaire."},{label:"Stade avancé",text:"Atteinte des bras et du tronc, insuffisance respiratoire possible."}]},{id:"tendinite",name:"Tendinite de l'épaule",system:"musculaire",course:"Chronique",frequency:"Très fréquente",tagline:"Le tendon s'enflamme et chaque mouvement devient douloureux.",description:"La tendinite est une inflammation ou une dégénérescence d'un tendon, ici celui de la coiffe des rotateurs à l'épaule. Elle survient après des gestes répétitifs ou un effort intense.",mechanism:"Les microtraumatismes répétés dépassent la capacité de réparation du tendon. Des fibres se désorganisent, l'inflammation s'installe et le tendon s'épaissit. Lever le bras devient douloureux, surtout entre 60° et 120°.",symptoms:["Douleur à l'épaule","Douleur en levant le bras","Douleur nocturne","Faiblesse du bras","Craquements","Gêne pour s'habiller"],causes:["Gestes répétitifs","Sport de lancer ou de force","Mauvaise posture","Vieillissement du tendon","Épaule instable"],treatments:["Repos relatif et glace","Anti-inflammatoires","Kinésithérapie et renforcement","Infiltration de corticoïdes","Chirurgie si rupture"],prevention:["Échauffement avant l'effort","Renforcer la coiffe des rotateurs","Varier les gestes","Corriger les postures"],fact:"La tendinite évolue souvent vers une tendinopathie : le tendon est abîmé sans inflammation majeure, ce qui change la prise en charge.",vitals:tt(80,98,14,124,78,36.7),effects:[{target:"deltoides",type:"inflammation",amount:.8,label:"Tendinopathie de l'épaule",note:"Le tendon de la coiffe des rotateurs est irrité et épaissi ; chaque élévation du bras réveille la douleur."}],stages:[{label:"Irritation",text:"Douleur au mouvement, tendon encore peu modifié."},{label:"Tendinopathie",text:"Le tendon s'épaissit et perd son élasticité ; la douleur persiste au repos."},{label:"Rupture",text:"Une partie du tendon peut se rompre : la force de l'épaule chute."}]},{id:"diabete2",name:"Diabète de type 2",system:"endocrinien",course:"Chronique",frequency:"Très fréquente",tagline:"L'insuline agit mal : le sucre s'accumule dans le sang.",description:"Le diabète de type 2 est une maladie métabolique dans laquelle les cellules deviennent résistantes à l'insuline. Le pancréas s'épuise à en produire, et la glycémie reste élevée.",mechanism:"L'insuline ouvre normalement la porte du glucose aux cellules. Résistantes, elles laissent le sucre dans le sang. Le pancréas s'hypertrophie puis s'épuise. L'excès de glucose abîme les vaisseaux, les reins, les nerfs et la rétine.",symptoms:["Soif intense","Urines fréquentes","Fatigue","Perte de poids (parfois)","Cicatrisation lente","Troubles visuels","Fourmillements"],causes:["Surpoids et sédentarité","Alimentation riche en sucres","Prédisposition génétique","Âge","Antécédents de diabète gestationnel"],treatments:["Metformine et autres antidiabétiques","Changement d'alimentation","Activité physique","Insuline si nécessaire","Suivi de la glycémie"],prevention:["Maintenir un poids santé","Bouger 30 minutes par jour","Limiter les sucres rapides","Dépistage si facteurs de risque"],fact:"Le diabète de type 2 peut rester silencieux pendant des années ; il est souvent découvert lors d'un bilan ou d'une complication.",vitals:tt(86,97,16,138,88,36.8),effects:[{target:"pancreas",type:"atrophy",amount:.75,label:"Épuisement pancréatique",note:"Les cellules productrices d'insuline s'épuisent : la glycémie ne peut plus être régulée."},{target:"reins",type:"atrophy",amount:.35,label:"Néphropathie diabétique",note:"L'excès de glucose abîme les petits vaisseaux des reins et leur filtre."},{target:"aorte",type:"plaque",amount:.45,label:"Artères fragilisées",note:"L'hyperglycémie accélère l'athérosclérose et rigidifie les artères."}],stages:[{label:"Insulino-résistance",text:"La glycémie monte discrètement, le pancréas compense."},{label:"Diabète déclaré",text:"La glycémie reste élevée ; soif, fatigue et urines fréquentes."},{label:"Complications",text:"Atteinte des reins, des nerfs, de la rétine et des artères."}]},{id:"hypothyroidie",name:"Hypothyroïdie",system:"endocrinien",course:"Chronique",frequency:"Fréquente",tagline:"La thyroïde paresseuse ralentit tout le métabolisme.",description:"L'hypothyroïdie est un déficit de production des hormones thyroïdiennes. Le métabolisme ralentit, ce qui retentit sur le cœur, la peau, le poids et l'humeur.",mechanism:"Sans T3 et T4, les cellules travaillent au ralenti. Le cœur bat plus lentement, la température baisse, la peau devient sèche, et l'organisme retient de l'eau. Le feedback augmente la TSH, qui stimule la thyroïde — souvent insuffisamment.",symptoms:["Fatigue persistante","Prise de poids","Frilosité","Peau sèche","Constipation","Ralentissement de la pensée","Cheveux fragiles"],causes:["Thyroïdite auto-immune de Hashimoto","Carence en iode","Traitement par iode radioactif ou chirurgie","Médicaments","Hypothyroïdie congénitale"],treatments:["Lévothyroxine (hormone de substitution)","Suivi régulier de la TSH","Adaptation de la dose"],prevention:["Apports suffisants en iode","Dépistage en cas de symptômes","Suivi après chirurgie ou traitement thyroïdien"],fact:"Un goitre peut apparaître quand la thyroïde grossit pour compenser un manque d'iode ou une production insuffisante.",vitals:tt(58,97,12,108,70,35.9),effects:[{target:"thyroide",type:"atrophy",amount:.85,label:"Thyroïde insuffisante",note:"La glande produit trop peu de T3 et T4 : tout le métabolisme ralentit."}],stages:[{label:"Hypothyroïdie fruste",text:"Fatigue et frilosité discrètes, TSH légèrement élevée."},{label:"Hypothyroïdie déclarée",text:"Ralentissement net, prise de poids, peau sèche, bradycardie."},{label:"Forme sévère",text:"Ralentissement profond, œdème, risque de coma myxœdémateux (rare)."}]}],ss=Object.fromEntries(Hn.map(i=>[i.id,i])),qu={inflammation:"Inflammation",obstruction:"Obstruction",fibrosis:"Fibrose",necrosis:"Nécrose",edema:"Œdème",atrophy:"Atrophie",tumor:"Tumeur",plaque:"Plaque",stone:"Calcul",hemorrhage:"Hémorragie",demyelination:"Démyélinisation",fracture:"Fracture",wear:"Usure",hypertrophy:"Hypertrophie",destruction:"Destruction",consolidation:"Consolidation",hyperactivity:"Hyperactivité",porosity:"Porosité",scoliosis:"Déformation"},yn=Math.PI*2,jn=Qo.clamp;function qv(i){let e=i>>>0;return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Wv(i){let e=2166136261;for(let t=0;t<i.length;t++)e^=i.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}const Sr={full:{pos:[.72,1.28,2.55],target:[0,1,0]},thorax:{pos:[.42,1.36,.95],target:[0,1.27,0]},abdomen:{pos:[.3,1.08,.86],target:[0,1.02,0]},head:{pos:[.32,1.68,.58],target:[0,1.64,0]},profile:{pos:[2.45,1.18,.22],target:[0,1.02,0]},back:{pos:[-.15,1.18,-2.5],target:[0,1.06,0]}},Mr={inflammation:["#e85656","#d61f1f",.38],obstruction:["#a83c47","#ff5a5a",.32],fibrosis:["#bdb488","#c79a2e",.34],necrosis:["#4d2229","#7a1020",.24],edema:["#a9cfe4","#4aa6cd",.24],atrophy:["#9c7a6c","#b85a3e",.26],hypertrophy:["#dd5264","#ff2d45",.34],tumor:["#c084d8","#a855f7",.35],plague:["#b48a4f","#6d4d1e",.18],plaque:["#c9a35a","#8a6a2a",.2],stone:["#d9b65a","#f5c542",.25],hemorrhage:["#ff3d3d","#ff1010",.55],demyelination:["#efe9d8","#cfc6ae",.18],fracture:["#d8ceb0","#ff6b6b",.2],wear:["#e79b5c","#ff6b35",.28],destruction:["#7d6a6c","#3b2024",.14],consolidation:["#efd9cd","#c9a08e",.16],hyperactivity:["#ffd75e","#ffb703",.6],porosity:["#cfc5a9","#6e6450",.14],scoliosis:["#e5ddc8","#e5ddc8",.02]},Xv={inflammation:1.06,obstruction:.985,fibrosis:.93,necrosis:.99,edema:1.16,atrophy:.74,hypertrophy:1.13,tumor:1.02,destruction:1.12,consolidation:1.03,wear:1,hemorrhage:1,demyelination:1,fracture:1,porosity:.98,plaque:1,stone:1.03,hyperactivity:1,scoliosis:1};class $v{constructor({stage:e,labels:t,onSelect:n,onHover:s}){this.stage=e,this.onSelect=n||(()=>{}),this.onHover=s||(()=>{}),this.selectedId=null,this.hoverId=null,this.disease=null,this.severity=0,this.systemFilter="all",this.labelsOn=!0,this.layers={skin:!0,muscles:!1,bones:!1,organs:!0},this.vitals={...Ot},this.morphs=new Map,this.overlays=[],this.auras=[],this.auraEntries=new Set,this.animated=[],this.glowMats=[],this.flashes=[],this.tween=null,this.skinOpacity=1,this.skinOpacityTarget=1,this.explode=0,this.explodeTarget=0,this.explodeData=[],this.isolatedId=null,this.crossSection=!1,this.clipPlane=new wn(new w(0,0,-1),.12),this.tremor=0,this.tremorPhase=0,this.clock=new hf,this.pointerDown=null,this.hoverRaf=null,this.lastPointer={x:0,y:0},this.tint=new Ae("#67e8f9"),this.modelsLoaded=!1,this._initRenderer(t),this._initScene(),this._buildBody(),this._initHalo(),this._initExplode(),this._initEvents(),this.resize(),this._setVitals(Ot),this._animate=this._animate.bind(this),this.renderer.setAnimationLoop(this._animate)}_initRenderer(e){this.renderer=new lv({antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.localClippingEnabled=!0,this.renderer.toneMapping=Wr,this.renderer.toneMappingExposure=1.02,this.renderer.outputColorSpace=Kt,this.renderer.domElement.className="webgl",this.stage.appendChild(this.renderer.domElement),this.labelRenderer=new Ev,this.labelRenderer.domElement.className="label-layer",e.appendChild(this.labelRenderer.domElement)}_initScene(){this.scene=new bh,this.scene.background=new Ae("#04080f"),this.camera=new pn(38,1,.05,60),this.camera.position.set(...Sr.full.pos),this.controls=new uv(this.camera,this.renderer.domElement),this.controls.target.set(...Sr.full.target),this.controls.enableDamping=!0,this.controls.dampingFactor=.075,this.controls.enablePan=!1,this.controls.minDistance=.32,this.controls.maxDistance=5.2,this.controls.minPolarAngle=Math.PI*.12,this.controls.maxPolarAngle=Math.PI*.52,this.controls.rotateSpeed=.65,this.controls.zoomSpeed=.8,this.controls.autoRotateSpeed=.45,this.controls.update();const e=new of(10470655,.75);this.scene.add(e);const t=new nf(11132159,528410,1.1);this.scene.add(t);const n=new Ba(15398143,2.4);n.position.set(1.8,3.2,2.2),this.scene.add(n);const s=new Ba(5032432,1.4);s.position.set(-2.6,1.5,1.6),this.scene.add(s);const r=new Ba(3003583,2);r.position.set(-.4,2,-2.4),this.scene.add(r);const a=new rf(1920728,4,4);a.position.set(0,.2,.8),this.scene.add(a);const o=this._radialTexture("#12304d","#04080f"),c=new Ch(new xu({map:o,transparent:!0,depthWrite:!1,depthTest:!1,opacity:.9}));c.position.set(0,1.15,-3.2),c.scale.set(7.5,7.5,1),c.renderOrder=-20,this.scene.add(c);const l=new ff(1.7,12,7,72,1851228,860723);l.material.transparent=!0,l.material.opacity=.6,l.position.y=.002,this.scene.add(l);const d=this._radialTexture("#1b4b66","#04080f",!0),f=new We(new ks(4.6,4.6),new hn({map:d,transparent:!0,opacity:.55,blending:Gt,depthWrite:!1}));f.rotation.x=-Math.PI/2,f.position.y=.001,this.scene.add(f);const u=new We(new Ki(.86,.872,128),new hn({color:3003583,transparent:!0,opacity:.25,side:Zt,blending:Gt,depthWrite:!1}));u.rotation.x=-Math.PI/2,u.position.y=.003,this.scene.add(u),this.composer=new Lv(this.renderer),this.composer.addPass(new Pv(this.scene,this.camera)),this.bloom=new is(new re(1,1),.55,.5,.72),this.composer.addPass(this.bloom),this.composer.addPass(new Iv)}_radialTexture(e,t,n=!1){const r=document.createElement("canvas");r.width=r.height=512;const a=r.getContext("2d"),o=a.createRadialGradient(512/2,512/2,0,512/2,512/2,512/2);o.addColorStop(0,e),o.addColorStop(n?.32:.12,e),o.addColorStop(1,"rgba(4,8,15,0)"),a.fillStyle=o,a.fillRect(0,0,512,512);const c=new Uh(r);return c.colorSpace=Kt,c}_buildBody(){this.anatomy=Vv(),this.body=this.anatomy.root,this.entries=this.anatomy.entries,this.scene.add(this.body),this.overlayRoot=new qt,this.body.add(this.overlayRoot),this.pickRoots=[this.anatomy.organsGroup,this.anatomy.skeletonGroup,this.anatomy.musclesGroup];const e=new Set(["cerveau","cervelet","tronc_cerebral","moelle_epiniere"]);for(const t of Object.values(this.entries))if(t.kind==="organ"&&t.label){const n=this._labelOffset(t.id);t.label.position.copy(n),e.has(t.id)&&(t.label.position.y+=.015)}this.heart=this.entries.coeur,this.lungs=this.entries.poumons,this.skinMaterial=this.anatomy.skinMaterial,this._applyLayers(),this._loadAnatomyModels()}async _loadAnatomyModels(){try{const e=await fetch("./models/anatomy.json");if(!e.ok)throw new Error(`manifest ${e.status}`);const t=await e.json(),n=await this._fetchGeometry(t.bin);this._applyAnatomyModels(t,n)}catch(e){console.warn("Modèles anatomiques 3D non chargés, anatomie procédurale conservée :",e)}}async _fetchGeometry(e){const t=async n=>{const s=await fetch(n);if(!s.ok)throw new Error(`geometry ${s.status}`);const r=await s.arrayBuffer(),a=new Uint8Array(r,0,Math.min(2,r.byteLength));if(!(a[0]===31&&a[1]===139))return r;if(typeof DecompressionStream!="function")throw new Error("gzip non pris en charge par ce navigateur");return new Response(new Blob([r]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer()};try{return await t(`./models/${e}.gz`)}catch{return t(`./models/${e}`)}}_geometryFromRecord(e,t){const n=new Float32Array(e,t.positions,t.vertexCount*3),s=new Int16Array(e,t.normals,t.vertexCount*3),r=t.indexType==="u16"?new Uint16Array(e,t.indices,t.indexCount):new Uint32Array(e,t.indices,t.indexCount),a=new dt;return a.setAttribute("position",new Sn(n,3)),a.setAttribute("normal",new Sn(s,3,!0)),a.setIndex(new Sn(r,1)),a.computeBoundingBox(),a.computeBoundingSphere(),a}_applyAnatomyModels(e,t){if(!this.modelsLoaded){this.modelsLoaded=!0;for(const[n,s]of Object.entries(e.entities||{})){const r=this.entries[n];if(!r||!s)continue;const a=this._geometryFromRecord(t,s),o=r.group.position;o.lengthSq()>0&&a.translate(-o.x,-o.y,-o.z),a.computeBoundingBox();const c=a.boundingBox.getCenter(new w);a.translate(-c.x,-c.y,-c.z),a.computeBoundingBox(),a.computeBoundingSphere();const l=new We(a,r.materials[0]);l.name=`${n}-model`,l.position.copy(c),l.userData.pickId=n,r.group.add(l),n==="colonne"&&(r.spineBend={mesh:l,original:a.attributes.position.array.slice(),minY:a.boundingBox.min.y,maxY:a.boundingBox.max.y});for(const d of r.meshes)d!==l&&d.parent?.remove(d);r.meshes=[l],r.meshBase=new Map([[l,{scale:l.scale.clone(),position:l.position.clone(),rotation:l.rotation.clone()}]]),r.vertebrae=null}if(e.skin){const n=this._geometryFromRecord(t,e.skin);for(const r of[...this.anatomy.skinGroup.children])this.anatomy.skinGroup.remove(r);const s=new We(n,this.skinMaterial);s.name="skin-model",this.anatomy.skinGroup.add(s),this.skinMaterial.uniforms.uScan.value=0}this._applyLayers(),this._applyClipping(this.crossSection),this._updateEmphasis(),this._positionHalo(),this.stage.dispatchEvent(new CustomEvent("models-loaded"))}}_labelOffset(e){const t={cerveau:[0,.14,0],cervelet:[-.085,0,-.01],tronc_cerebral:[-.06,0,.02],moelle_epiniere:[.075,.15,0],coeur:[.105,.06,.02],coronaires:[-.095,0,.045],aorte:[-.1,.17,-.02],poumons:[-.175,.1,0],bronches:[.13,.02,0],oesophage:[-.02,.21,0],estomac:[.1,.03,.01],foie:[-.13,.04,0],vesicule:[-.15,-.01,.02],pancreas:[.01,-.07,0],intestin_grele:[.08,-.04,.09],colon:[.175,-.02,0],reins:[.15,.1,-.02],ureteres:[-.1,-.03,.02],vessie:[0,-.055,.05],rate:[.12,.03,-.02],thyroide:[.065,0,.02],surrenales:[-.14,.015,-.01]};return new w(...t[e]||[0,.03,0])}_initHalo(){const e=t=>new hn({color:6809849,transparent:!0,opacity:t,side:Zt,depthTest:!1,depthWrite:!1,blending:Gt});this.halo=new qt,this.haloRing=new We(new Ki(.955,1,80),e(.9)),this.haloRing2=new We(new Ki(1.16,1.175,80),e(.32)),this.halo.add(this.haloRing,this.haloRing2),this.halo.visible=!1,this.halo.renderOrder=40,this.scene.add(this.halo)}_initEvents(){const e=this.renderer.domElement;e.addEventListener("pointerdown",t=>{this.pointerDown={x:t.clientX,y:t.clientY},this.tween=null}),e.addEventListener("pointerup",t=>{if(!this.pointerDown)return;const n=t.clientX-this.pointerDown.x,s=t.clientY-this.pointerDown.y;if(this.pointerDown=null,Math.hypot(n,s)>6)return;const r=this._pick(t.clientX,t.clientY);this.onSelect(r,t)}),e.addEventListener("pointermove",t=>{this.lastPointer.x=t.clientX,this.lastPointer.y=t.clientY,!this.hoverRaf&&(this.hoverRaf=requestAnimationFrame(()=>{this.hoverRaf=null;const n=this._pick(this.lastPointer.x,this.lastPointer.y);n!==this.hoverId?(this.hoverId=n,e.style.cursor=n?"pointer":"grab",this.onHover(n?this.entries[n]:null,this.lastPointer.x,this.lastPointer.y)):n&&this.onHover(this.entries[n],this.lastPointer.x,this.lastPointer.y)}))}),e.addEventListener("pointerleave",()=>{this.hoverId=null,this.onHover(null,0,0)})}_pick(e,t){const n=this.renderer.domElement.getBoundingClientRect(),s=(e-n.left)/n.width*2-1,r=-((t-n.top)/n.height)*2+1;this.raycaster=this.raycaster||new df,this.raycaster.setFromCamera({x:s,y:r},this.camera);const a=this.pickRoots.filter(c=>c.visible),o=this.raycaster.intersectObjects(a,!0);for(const c of o){let l=c.object;for(;l;){if(l.userData&&l.userData.pickId)return l.userData.pickId;l=l.parent}}return null}setLayer(e,t){if(e==="labels"){this.setLabels(t);return}this.layers[e]=t,this._applyLayers()}_applyLayers(){this.anatomy.skinGroup.visible=this.layers.skin&&!this.isolatedId&&!this.crossSection,this.anatomy.musclesGroup.visible=this.layers.muscles,this.anatomy.skeletonGroup.visible=this.layers.bones,this.anatomy.organsGroup.visible=this.layers.organs,this.layers.muscles?this.skinOpacityTarget=.32:this.layers.bones?this.skinOpacityTarget=.62:this.skinOpacityTarget=1,this.disease&&this.severity>.02&&(this.skinOpacityTarget=this.layers.muscles?.1:.15),this._updateLabelVisibility()}setLabels(e){this.labelsOn=e,this._updateLabelVisibility()}_updateLabelVisibility(){for(const e of Object.values(this.entries)){if(!e.label)continue;const t=this.isolatedId?e.id===this.isolatedId:!0;e.label.visible=this.labelsOn&&this.layers.organs&&t}}setSystemFilter(e){this.systemFilter=e,this._updateEmphasis()}setSelected(e){if(this.selectedId=e,this._updateEmphasis(),!e){this.halo.visible=!1;return}this._positionHalo()}_positionHalo(){const e=this.entries[this.selectedId];if(!e){this.halo.visible=!1;return}const t=new fn().setFromObject(e.group);if(t.isEmpty())return;const n=t.getCenter(new w),s=t.getSize(new w),r=Math.max(s.x,s.y,s.z)*.52+.018;this.halo.position.copy(n),this.halo.scale.setScalar(r),this.halo.visible=!0}focusEntry(e,t=1){const n=this.entries[e];if(!n)return;const s=new fn().setFromObject(n.group),r=s.isEmpty()?n.group.getWorldPosition(new w):s.getCenter(new w),a=s.isEmpty()?new kn(r,.1):s.getBoundingSphere(new kn),o=this.camera.position.clone().sub(this.controls.target).normalize();o.lengthSq()<.1&&o.set(.2,.1,1).normalize();const c=jn(a.radius*4.6,.92,2.1)*t;this._tweenTo(r.clone().add(o.multiplyScalar(c)),r,.9)}focusEntries(e,t=1){const n=new fn;for(const c of e){const l=this.entries[c];l&&n.expandByObject(l.group)}if(n.isEmpty())return;const s=n.getCenter(new w),r=n.getBoundingSphere(new kn),a=this.camera.position.clone().sub(this.controls.target).normalize();a.lengthSq()<.1&&a.set(.2,.1,1).normalize();const o=jn(r.radius*3.4,1,2.35)*t;this._tweenTo(s.clone().add(a.multiplyScalar(o)),s,.95)}_initExplode(){const e=new w(0,1.02,0);let t=0;for(const n of Object.values(this.entries)){if(n.kind!=="organ")continue;const s=new fn().setFromObject(n.group),a=(s.isEmpty()?n.group.getWorldPosition(new w):s.getCenter(new w)).clone().sub(e);if(a.y*=.45,Math.hypot(a.x,a.z)<.02){const o=t/3*Math.PI*2+.4;a.x=Math.cos(o)*.14,a.z=Math.sin(o)*.14}a.normalize(),this.explodeData.push({entry:n,base:n.group.position.clone(),dir:a,dist:.5+t%3*.035}),t++}}setExplode(e){this.setExplodeAmount(e?1:0)}setExplodeAmount(e){const t=jn(e,0,1);this.explodeTarget=t,t>.001&&this.isolateEntry(null)}setCrossSection(e){this.crossSection=!!e,this._applyClipping(this.crossSection),this._applyLayers()}_applyClipping(e){const t=new Set,n=s=>{s.traverse(r=>{if(!r.isMesh||!r.material)return;const a=Array.isArray(r.material)?r.material:[r.material];for(const o of a)!o||o.isShaderMaterial||t.add(o)})};for(const s of Object.values(this.entries))n(s.group);for(const s of this.overlays)n(s);for(const s of t)e?(s.userData._clipSide===void 0&&(s.userData._clipSide=s.side),s.clippingPlanes=[this.clipPlane],s.clipShadows=!0,s.side=Zt):(s.clippingPlanes=null,s.clipShadows=!1,s.userData._clipSide!==void 0&&(s.side=s.userData._clipSide,delete s.userData._clipSide)),s.needsUpdate=!0}isolateEntry(e){if(this.isolatedId=e||null,!e){for(const t of Object.values(this.entries))t.group.visible=!0;for(const t of this.overlays)t.visible=!0;this._applyLayers(),this._updateEmphasis();return}for(const t of Object.values(this.entries))t.group.visible=t.id===e;for(const t of this.overlays)t.visible=t.userData.entryId===e;this.anatomy.skinGroup.visible=!1,this._updateEmphasis(),this._updateLabelVisibility()}frameAll(e=1.18){const t=new fn;for(const o of Object.values(this.entries))o.group.visible&&t.expandByObject(o.group);if(t.isEmpty())return;const n=t.getCenter(new w),s=t.getBoundingSphere(new kn),r=this.camera.position.clone().sub(this.controls.target).normalize();r.lengthSq()<.1&&r.set(.2,.1,1).normalize();const a=jn(s.radius*2.45*e,1.7,7);this._tweenTo(n.clone().add(r.multiplyScalar(a)),n,.95)}_applyExplode(){for(const e of this.explodeData)e.entry.group.position.copy(e.base).addScaledVector(e.dir,this.explode*e.dist)}setView(e){const t=Sr[e]||Sr.full;this._tweenTo(new w(...t.pos),new w(...t.target),.85)}_tweenTo(e,t,n=.8){this.tween={fromPos:this.camera.position.clone(),toPos:e.clone(),fromTarget:this.controls.target.clone(),toTarget:t.clone(),t:0,duration:n}}setAutoRotate(e){this.controls.autoRotate=e}_setVitals(e){this.vitals={...e}}_computeVitals(){if(!this.disease||this.severity<=.01){this.vitals={...Ot};return}const e=jn(this.severity,0,1),t=this.disease.vitals,n=(s,r)=>Math.round((s+(r-s)*e)*10)/10;this.vitals={hr:Math.round(n(Ot.hr,t.hr)),spo2:Math.round(n(Ot.spo2,t.spo2)),rr:Math.round(n(Ot.rr,t.rr)),sbp:Math.round(n(Ot.sbp,t.sbp)),dbp:Math.round(n(Ot.dbp,t.dbp)),temp:Math.round(n(Ot.temp,t.temp)*10)/10}}getVitals(){return this.vitals}showDisease(e,t=.65){this.disease=e,this.severity=jn(t,0,1),this._applyPathology()}setSeverity(e){this.severity=jn(e,0,1),this._applyPathology()}clearDisease(){this.disease=null,this.severity=0,this._resetPathology(),this._applyLayers(),this._updateEmphasis(),this._computeVitals(),this._positionHalo()}_resetPathology(){for(const e of Object.values(this.entries))this._restoreEntry(e);for(const e of this.overlays)e.parent&&e.parent.remove(e),e.traverse(t=>{t.geometry&&t.geometry.dispose(),t.material&&(Array.isArray(t.material)?t.material.forEach(n=>n.dispose()):t.material.dispose())});this.overlays=[],this.animated=[],this.glowMats=[],this.morphs.clear();for(const e of this.auras)e.parent&&e.parent.remove(e.mesh),e.mesh.material&&e.mesh.material.dispose();this.auras=[],this.auraEntries.clear(),this.tremor=0,this.skinMaterial.uniforms.uTint.value.set("#67e8f9"),this.skinMaterial.uniforms.uBase.value.set("#8ec5e6"),this.skinMaterial.uniforms.uRim.value.set("#67e8f9"),this.body&&(this.body.position.x=0,this.body.rotation.z=0)}_restoreEntry(e){for(const t of e.meshes){const n=e.meshBase.get(t);n&&(t.scale.copy(n.scale),t.position.copy(n.position),t.rotation.copy(n.rotation));const s=t.material;if(!s||!s.userData.__orig)continue;const r=s.userData.__orig;s.color&&s.color.copy(r.color),s.emissive&&s.emissive.copy(r.emissive),s.emissiveIntensity!==void 0&&(s.emissiveIntensity=r.emissiveIntensity),s.opacity=r.opacity,s.transparent=r.transparent,s.depthWrite=r.depthWrite,s.roughness!==void 0&&(s.roughness=r.roughness),s.needsUpdate=!0}if(e.spineBend){const t=e.spineBend.mesh.geometry.attributes.position;t.array.set(e.spineBend.original),t.needsUpdate=!0}if(e.vertebrae)for(const t of e.vertebrae)t.mesh.position.copy(t.base),t.mesh.rotation.z=0,t.spinous.position.copy(t.spinousBase);e.group&&e.group.scale.set(1,1,1),e.morph=1,e.labelEl&&e.labelEl.classList.remove("dim")}_applyPathology(){if(this._resetPathology(),!this.disease||this.severity<=.005){this._computeVitals(),this._applyLayers(),this._updateEmphasis(),this._positionHalo();return}const e=this.severity,t=new Set;this.affected=t;const n=new Map;for(const s of this.disease.effects){const r=this.entries[s.target];if(!r)continue;t.add(s.target);const a=jn(s.amount*e,0,1);this._applyEffect(r,s,a);const o=Mr[s.type]||Mr.inflammation,c=a*(o[2]||.2),l=n.get(r.id);(!l||c>l.score)&&n.set(r.id,{entry:r,color:o[1],amount:a,score:c})}for(const s of n.values())this._addAura(s.entry,s.color,s.amount);if(this.disease.global){if(this.disease.global.skin){const s=new Ae(this.disease.global.skin);this.skinMaterial.uniforms.uTint.value.copy(s),this.skinMaterial.uniforms.uBase.value.copy(new Ae("#8ec5e6").lerp(s,.55)),this.skinMaterial.uniforms.uRim.value.copy(s)}this.disease.global.tremor&&(this.tremor=this.disease.global.tremor*e)}this._computeVitals(),this._applyLayers(),this._updateEmphasis(),this._positionHalo(),this.crossSection&&this._applyClipping(!0)}_applyEffect(e,t,n){if(n<=.001)return;const s=Mr[t.type]||Mr.inflammation,[r,a,o]=s;this._tint(e,r,a,o*.55+n*.45),this._glow(e,a,o*(.45+n*.8));const c=Xv[t.type]??1;if(c!==1){const l=1+(c-1)*n,d=this.morphs.get(e.id)||1,f=e.kind==="organ"?d*l:Math.min(d,l);this.morphs.set(e.id,f),e.morph=f,this._applyMorph(e,f)}t.type==="scoliosis"&&this._bendSpine(e,n),this._addOverlay(e,t.type,n,Wv(e.id+t.type)),e.kind==="organ"&&(e.id==="coeur"||e.id==="poumons")&&this._positionHalo()}_addAura(e,t,n){if(this.auraEntries.has(e.id))return;this.auraEntries.add(e.id);const s=new hn({color:new Ae(t),transparent:!0,opacity:.06+n*.07,blending:Gt,side:Wt,depthWrite:!1,depthTest:!0}),r=new Set;for(const a of e.meshes){if(!a.geometry||r.has(a))continue;r.add(a);const o=new We(a.geometry,s);o.scale.setScalar(1.06),o.renderOrder=8,o.frustumCulled=!1,a.add(o),this.auras.push({parent:a,mesh:o}),this.animated.push({obj:o,base:1.1,phase:Math.random()*yn,speed:1.7,amp:.02})}}_applyMorph(e,t){if(e.kind==="organ")e.group.scale.setScalar(t);else if(e.kind==="muscle")for(const n of e.meshes){const s=e.meshBase.get(n);s&&n.scale.copy(s.scale).multiplyScalar(t)}}_tint(e,t,n,s){const r=new Ae(t),a=new Ae(n),o=new Set;for(const c of e.meshes){const l=c.material;!l||!l.color||o.has(l)||(o.add(l),l.color.lerp(r,.62),l.emissive&&l.emissive.lerp(a,.7),l.roughness=Math.min(1,(l.roughness??.5)+.15))}e.__lastColor=r,e.__lastEmissive=a}_glow(e,t,n){const s=new Set;for(const r of e.meshes){const a=r.material;if(!a||s.has(a)||!a.emissive)continue;s.add(a);const o=Math.min(1.1,n+.1);a.emissiveIntensity=Math.max(a.emissiveIntensity||0,o),this.glowMats.push({mat:a,base:a.emissiveIntensity,phase:Math.random()*yn})}}_bendSpine(e,t){if(e.spineBend){const{mesh:n,original:s,minY:r,maxY:a}=e.spineBend,o=n.geometry.attributes.position,c=o.array,l=Math.max(1e-4,a-r);for(let d=0;d<c.length;d+=3){const f=(s[d+1]-r)/l;c[d]=s[d]+Math.sin(f*Math.PI)*.045*t}o.needsUpdate=!0,n.geometry.computeBoundingSphere();return}if(e.vertebrae)for(const n of e.vertebrae){const s=Math.sin(n.t*Math.PI)*.075*t;n.mesh.position.x=s,n.mesh.rotation.z=-Math.cos(n.t*Math.PI)*.25*t,n.spinous.position.x=s,n.spinous.rotation.z=n.mesh.rotation.z}}_addOverlay(e,t,n,s){const r=new fn().setFromObject(e.group);if(r.isEmpty())return;const a=r.getCenter(new w),o=r.getSize(new w),c=Math.max(o.x,o.y,o.z,.02),l=qv(s),d=new qt;d.userData.entryId=e.id,e.group.updateWorldMatrix(!0,!1),e.group.add(d),d.position.copy(e.group.worldToLocal(a.clone())),this.overlays.push(d);const f=(u,h,m)=>{const _=new We(u,h);return _.position.copy(m),d.add(_),_};switch(t){case"obstruction":{const u=new Yt({color:11811386,emissive:16726832,emissiveIntensity:.5,roughness:.55,transparent:!0,opacity:.9}),h=3;for(let _=0;_<h;_++){const g=c*(.14+l()*.1)*(.7+n*.6),p=new We(new Hs(g,g*.16,6,20),u);p.position.set((l()-.5)*o.x*.5,(l()-.5)*o.y*.75,(l()-.5)*o.z*.5),p.rotation.set(Math.PI/2+(l()-.5)*.4,(l()-.5)*.4,0),d.add(p),this.animated.push({obj:p,base:p.scale.x,phase:l()*yn,speed:2.2,amp:.07})}const m=new Yt({color:15778922,emissive:9067026,emissiveIntensity:.15,roughness:.4});for(let _=0;_<5;_++){const g=c*(.03+l()*.03);f(new Cs(g,1),m,new w((l()-.5)*o.x*.7,(l()-.5)*o.y*.7,(l()-.5)*o.z*.7)).scale.set(1,1,1)}break}case"plaque":{const u=new Yt({color:14729076,emissive:8018462,emissiveIntensity:.1,roughness:.35,metalness:.15}),h=7;for(let m=0;m<h;m++){const _=new w(l()-.5,l()-.5,l()-.5).normalize(),g=new w(_.x*o.x*.44,_.y*o.y*.44,_.z*o.z*.44),p=f(new Vt(c*(.018+l()*.014),8,6),u,g);p.scale.z=.45,p.lookAt(a)}break}case"tumor":{const u=new Yt({color:11032008,emissive:8266446,emissiveIntensity:.35,roughness:.55,transparent:!0,opacity:.95});for(let h=0;h<3;h++){const m=c*(.11+l()*.05)*(.6+n*.65),_=new We(new Cs(m,1),u);_.position.set((l()-.5)*o.x*.3,(l()-.5)*o.y*.35,(l()-.5)*o.z*.3+.01),d.add(_),this.animated.push({obj:_,base:1,phase:l()*yn,speed:1.4,amp:.04})}break}case"stone":{const u=new Yt({color:15321448,emissive:12092939,emissiveIntensity:.35,roughness:.35,metalness:.1});for(let h=0;h<4;h++){const m=c*(.035+l()*.045)*(.7+n*.5),_=new We(new Cs(m,0),u);_.position.set((l()-.5)*o.x*.45,(l()-.5)*o.y*.45,(l()-.5)*o.z*.45),_.rotation.set(l()*3,l()*3,l()*3),d.add(_)}break}case"inflammation":{if(e.kind!=="organ")break;const u=new hn({color:16726832,transparent:!0,opacity:.05+n*.09,blending:Gt,depthWrite:!1});for(let h=0;h<6;h++){const m=Math.min(c*(.14+l()*.14)*(.75+n*.5),.055),_=new We(new Vt(m,12,9),u);_.position.set((l()-.5)*o.x*.55,(l()-.5)*o.y*.55,(l()-.5)*o.z*.55),d.add(_),this.animated.push({obj:_,base:1,phase:l()*yn,speed:1.8,amp:.06,pulse:!0})}break}case"edema":{const u=new hn({color:8308976,transparent:!0,opacity:.1+n*.1,blending:Gt,depthWrite:!1});for(let h=0;h<8;h++){const m=c*(.05+l()*.07),_=new We(new Vt(m,10,8),u);_.position.set((l()-.5)*o.x*.62,(l()-.5)*o.y*.62,(l()-.5)*o.z*.62),_.scale.set(1.3,.85,1.1),d.add(_),this.animated.push({obj:_,base:1,phase:l()*yn,speed:1.5,amp:.08})}break}case"fibrosis":{const u=new Yt({color:14341574,emissive:5327936,emissiveIntensity:.08,roughness:.95,transparent:!0,opacity:.88});for(let h=0;h<12;h++){const m=new w(l()-.5,l()-.5,l()-.5).normalize(),_=new w(m.x*o.x*.44,m.y*o.y*.44,m.z*o.z*.44),g=c*(.026+l()*.03)*(.7+n*.5),p=f(new Vt(g,8,6),u,_);p.scale.set(1.35,1.35,.34),p.lookAt(a)}break}case"atrophy":{const u=new Yt({color:4205102,emissive:1771788,emissiveIntensity:.1,roughness:.9,transparent:!0,opacity:.78});for(let h=0;h<7;h++){const m=new w(l()-.5,l()-.5,l()-.5).normalize(),_=new w(m.x*o.x*.4,m.y*o.y*.4,m.z*o.z*.4),g=c*(.03+l()*.035),p=f(new Vt(g,8,6),u,_);p.scale.set(1.2,1.2,.3),p.lookAt(a)}break}case"hypertrophy":{const u=new hn({color:16731486,transparent:!0,opacity:.06+n*.09,blending:Gt,depthWrite:!1}),h=new We(new Vt(c*(.5+n*.1),20,14),u);d.add(h),this.animated.push({obj:h,base:1,phase:l()*yn,speed:2.6,amp:.045,pulse:!0});break}case"destruction":{const u=new Yt({color:1707024,emissive:590084,emissiveIntensity:.08,roughness:.95,transparent:!0,opacity:.72});for(let p=0;p<10;p++){const y=new w(l()-.5,l()-.5,l()-.5).normalize(),E=new w(y.x*o.x*.4,y.y*o.y*.4,y.z*o.z*.4),S=c*(.025+l()*.04),R=f(new Vt(S,8,6),u,E);R.scale.set(1,1,.35),R.lookAt(a)}const h=new Lr({color:9137003,size:c*.03,transparent:!0,opacity:.5,depthWrite:!1}),m=[];for(let p=0;p<24;p++)m.push((l()-.5)*o.x*.7,(l()-.5)*o.y*.7,(l()-.5)*o.z*.7);const _=new dt;_.setAttribute("position",new Xe(m,3));const g=new Ia(_,h);d.add(g),this.animated.push({obj:g,base:1,phase:l()*yn,speed:.6,amp:0,rotate:.15});break}case"necrosis":case"consolidation":case"demyelination":{const u=t==="necrosis"?2821395:t==="consolidation"?15851216:15920347,h=new Yt({color:u,emissive:t==="necrosis"?1179908:7037264,emissiveIntensity:.12,roughness:.75,transparent:!0,opacity:.92}),m=6;for(let _=0;_<m;_++){const g=new w(l()-.5,l()-.5,l()-.5).normalize(),p=new w(g.x*o.x*.4,g.y*o.y*.4,g.z*o.z*.4),y=c*(.035+l()*.03),E=f(new Vt(y,10,8),h,p);E.scale.set(1,1,.35),E.lookAt(a)}break}case"hemorrhage":{const u=new Lr({color:16723245,size:c*.055,transparent:!0,opacity:.9,blending:Gt,depthWrite:!1}),h=[];for(let p=0;p<46;p++)h.push((l()-.5)*o.x*.8,(l()-.5)*o.y*.8,(l()-.5)*o.z*.8);const m=new dt;m.setAttribute("position",new Xe(h,3));const _=new Ia(m,u);d.add(_),this.animated.push({obj:_,base:1,phase:0,speed:.7,amp:0,rotate:.25});const g=new hn({color:16723245,transparent:!0,opacity:.12+n*.12,blending:Gt,depthWrite:!1});f(new Vt(c*.34,16,12),g,new w);break}case"hyperactivity":{const u=new Lr({color:16766814,size:c*.06,transparent:!0,opacity:.95,blending:Gt,depthWrite:!1}),h=[];for(let g=0;g<60;g++){const p=new w(l()-.5,l()-.5,l()-.5).normalize().multiplyScalar(l());h.push(p.x*o.x*.55,p.y*o.y*.55,p.z*o.z*.55)}const m=new dt;m.setAttribute("position",new Xe(h,3));const _=new Ia(m,u);d.add(_),this.animated.push({obj:_,base:1,phase:0,speed:1.2,amp:0,rotate:.4,pulse:!0});break}case"fracture":{const u=new Yt({color:2624267,emissive:7016978,emissiveIntensity:.25,roughness:.8}),h=[],m=l()>.5?1:-1;for(let y=0;y<=5;y++){const E=y/5;h.push(new w((E-.5)*o.x*.9,(l()-.5)*o.y*.22,(l()-.5)*o.z*.3+m*o.z*.18))}const _=new il(h),g=new We(new rl(_,20,c*.012,5,!1),u);d.add(g);const p=new Yt({color:15853256,emissive:16734810,emissiveIntensity:.12,roughness:.5});for(let y=0;y<4;y++){const E=new We(new sl(c*.02,0),p);E.position.set((l()-.5)*o.x*.5,(l()-.5)*o.y*.5,(l()-.5)*o.z*.5),d.add(E)}break}case"wear":{const u=new hn({color:16742972,transparent:!0,opacity:.16+n*.14,blending:Gt,depthWrite:!1}),h=c*(.07+n*.035);if(e.kind!=="bone")for(let _=0;_<2;_++){const g=f(new Vt(h,16,12),u,new w((l()-.5)*o.x*.3,(l()-.5)*o.y*.3,(l()-.5)*o.z*.3));g.scale.y=.75,this.animated.push({obj:g,base:1,phase:l()*yn,speed:2.4,amp:.08})}const m=new Yt({color:15327431,roughness:.65});for(let _=0;_<3;_++)f(new $r(c*.022,c*.055,4),m,new w((l()-.5)*o.x*.5,(l()-.5)*o.y*.45,(l()-.5)*o.z*.45)).rotation.set(l()*2,l()*2,l()*2);break}case"porosity":{const u=new Yt({color:5260591,roughness:.9,transparent:!0,opacity:.8});for(let h=0;h<16;h++){const m=new w(l()-.5,l()-.5,l()-.5).normalize(),_=new w(m.x*o.x*.42,m.y*o.y*.42,m.z*o.z*.42),g=f(new Vt(c*(.009+l()*.012),6,5),u,_);g.scale.set(1,1,.4),g.lookAt(a)}break}}}_updateEmphasis(){const e=this.disease&&this.severity>.02,t=this.affected||new Set;for(const n of Object.values(this.entries)){let s=!1;this.systemFilter!=="all"&&n.system!==this.systemFilter&&(s=!0),e&&!t.has(n.id)&&(s=!0),(n.id===this.selectedId||n.id===this.isolatedId)&&(s=!1),this._dimEntry(n,s),n.labelEl&&n.labelEl.classList.toggle("dim",s)}}_dimEntry(e,t){const n=new Set;for(const s of e.meshes){const r=s.material;if(!r||n.has(r)||!r.userData.__orig)continue;n.add(r);const a=r.userData.__orig;t?(r.transparent=!0,r.opacity=Math.min(a.opacity,e.kind==="organ"?.16:.1),r.depthWrite=!1):(r.opacity=a.opacity,r.transparent=a.transparent,r.depthWrite=a.depthWrite)}for(const s of this.overlays);}flashEntry(e,t=!0){const n=this.entries[e];if(!n)return;const s=new fn().setFromObject(n.group);if(s.isEmpty())return;const r=s.getCenter(new w),a=Math.max(...s.getSize(new w).toArray())*.7+.05,o=new hn({color:t?4906624:16731501,transparent:!0,opacity:.9,side:Zt,depthTest:!1,depthWrite:!1,blending:Gt}),c=new We(new Ki(.92,1,64),o);c.position.copy(r),c.scale.setScalar(a),c.renderOrder=50,this.scene.add(c),this.flashes.push({mesh:c,life:0,ttl:.9,radius:a})}toastFlash(e,t){this.flashEntry(e,t)}resize(){const e=this.stage.clientWidth||1,t=this.stage.clientHeight||1;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),this.composer.setSize(e,t),this.labelRenderer.setSize(e,t),this.bloom.resolution.set(e,t)}_animate(){const e=Math.min(this.clock.getDelta(),.05),t=this.clock.elapsedTime;if(this.tween){this.tween.t+=e/this.tween.duration;const n=Math.min(1,this.tween.t),s=1-Math.pow(1-n,3);this.camera.position.lerpVectors(this.tween.fromPos,this.tween.toPos,s),this.controls.target.lerpVectors(this.tween.fromTarget,this.tween.toTarget,s),n>=1&&(this.tween=null)}if(this.controls.update(),Math.abs(this.explode-this.explodeTarget)>4e-4&&(this.explode+=(this.explodeTarget-this.explode)*Math.min(1,e*4.2),Math.abs(this.explode-this.explodeTarget)<4e-4&&(this.explode=this.explodeTarget),this._applyExplode(),this.selectedId&&this._positionHalo()),this.skinOpacity+=(this.skinOpacityTarget-this.skinOpacity)*Math.min(1,e*5),this.skinMaterial.uniforms.uOpacity.value=this.skinOpacity,this.skinMaterial.uniforms.uTime.value=t,this.heart){const n=this.vitals.hr||72,s=this.morphs.get("coeur")||1,r=t*n/60,a=Math.pow(Math.max(0,Math.sin(r*yn)),9),o=s*(1+a*.055);this.heart.group.scale.setScalar(o)}if(this.lungs){const n=this.vitals.rr||14,s=this.morphs.get("poumons")||1;let r=0;if(this.disease&&this.severity>0)for(const c of this.disease.effects)c.target==="poumons"&&(c.type==="fibrosis"||c.type==="destruction")&&(r+=c.amount*this.severity);r=Math.min(.9,r);const a=Math.sin(t*n*yn/60),o=.026*(1-r*.75);this.lungs.group.scale.set(s*(1+a*o*.45),s*(1+a*o),s*(1+a*o*.6))}if(this.tremor>.001){this.tremorPhase+=e;const n=this.tremorPhase;this.body.position.x=Math.sin(n*34)*.0016*this.tremor,this.body.rotation.z=Math.sin(n*27+1)*.0012*this.tremor}for(const n of this.animated)if(!(!n.obj||!n.obj.parent)){if(n.rotate&&(n.obj.rotation.y+=e*n.rotate),n.amp){const s=n.base*(1+Math.sin(t*n.speed+n.phase)*n.amp);n.obj.scale.setScalar(s)}n.pulse&&n.obj.material&&(n.obj.material.opacity=.55+Math.sin(t*4+n.phase)*.35)}for(const n of this.glowMats)n.mat&&(n.mat.emissiveIntensity=n.base*(.9+Math.sin(t*2.4+n.phase)*.22));if(this.halo.visible){this.halo.quaternion.copy(this.camera.quaternion);const n=1+Math.sin(t*2.2)*.025;this.haloRing.scale.setScalar(n),this.haloRing2.scale.setScalar(1+Math.sin(t*2.2+1)*.04)}for(let n=this.flashes.length-1;n>=0;n--){const s=this.flashes[n];s.life+=e;const r=s.life/s.ttl;s.mesh.scale.setScalar(s.radius*(1+r*1.1)),s.mesh.material.opacity=(1-r)*.9,s.mesh.quaternion.copy(this.camera.quaternion),r>=1&&(this.scene.remove(s.mesh),s.mesh.geometry.dispose(),s.mesh.material.dispose(),this.flashes.splice(n,1))}this.composer.render(),this.labelRenderer.render(this.scene,this.camera),this.onFrame&&this.onFrame(e)}}const Yc=Math.PI*2;function _s(i,e,t){const n=(i-e)/t;return Math.exp(-n*n)}class Yv{constructor(e,t){this.canvas=e,this.ctx=e.getContext("2d"),this.w=e.width,this.h=e.height,this.els=t,this.samples=new Array(272).fill(0),this.respSamples=new Array(272).fill(.5),this.phase=.32,this.respPhase=0,this.display={hr:72,spo2:98,rr:14,sbp:120,dbp:80,temp:36.8},this.time=0,this.uiTimer=0,this.irregular=!1,this.severity=0,this.diseaseName="";for(let n=0;n<60;n++)this._step(1/60)}setDisease(e,t){this.diseaseName=e?e.name:"",this.severity=t,this.irregular=!!(e&&["infarctus","insuffisance_cardiaque","epilepsie"].includes(e.id)&&t>.35),this._note()}_note(){const e=this.els.note;e&&(this.diseaseName?this.severity<=.02?(e.textContent="Gravité 0 % · état physiologique normal",e.classList.remove("warn")):(e.textContent=`${this.diseaseName} · gravité ${Math.round(this.severity*100)} %`,e.classList.toggle("warn",this.severity>.55)):(e.textContent="Sujet sain · valeurs de repos",e.classList.remove("warn")))}update(e,t,n,s){this.severity=s,this.irregular=!!(n&&["infarctus","insuffisance_cardiaque","epilepsie"].includes(n.id)&&s>.35);const r=Math.min(1,e*4),a=t||this.display;for(const c of Object.keys(this.display))this.display[c]+=(a[c]-this.display[c])*r;this.time+=e;const o=Math.max(1,Math.min(8,Math.round(e*120)));for(let c=0;c<o;c++)this._step(e/o);this.uiTimer+=e,this.uiTimer>.18&&(this.uiTimer=0,this._updateUI()),this._draw()}_step(e){const t=this.display.hr||72;let n=1;this.irregular?n=1+Math.sin(this.time*5.3)*.22+Math.sin(this.time*2.1)*.12:n=1+Math.sin(this.time*.55)*.02,this.phase+=e*t*n/60,this.phase%=1;const s=this.phase;let r=.09*_s(s,.14,.026)-.07*_s(s,.268,.012)+.95*_s(s,.302,.0125)-.26*_s(s,.335,.014)+.24*_s(s,.6,.042);this.irregular&&s>.05&&s<.12&&(r+=Math.sin(this.time*24)*.05),this.samples.push(r),this.samples.shift();const a=this.display.rr||14;this.respPhase+=e*a*Yc/60,this.respSamples.push(Math.sin(this.respPhase)),this.respSamples.shift()}_updateUI(){const e=this.display;this.els.hr&&(this.els.hr.textContent=Math.round(e.hr),this.els.spo2.textContent=Math.round(e.spo2),this.els.rr.textContent=Math.round(e.rr),this.els.bp.textContent=`${Math.round(e.sbp)}/${Math.round(e.dbp)}`,this.els.temp.textContent=e.temp.toFixed(1).replace(".",","),this.els.hr.style.color=e.hr>100?"var(--rose)":e.hr<60?"var(--blue)":"",this.els.spo2.style.color=e.spo2<92?"var(--rose)":"",this.els.temp.style.color=e.temp>37.6?"var(--amber)":"",this._note())}_draw(){const e=this.ctx,t=this.w,n=this.h;e.clearRect(0,0,t,n),e.strokeStyle="rgba(103, 232, 249, 0.075)",e.lineWidth=1;for(let u=0;u<=t;u+=26)e.beginPath(),e.moveTo(u+.5,0),e.lineTo(u+.5,n),e.stroke();for(let u=0;u<=n;u+=26)e.beginPath(),e.moveTo(0,u+.5),e.lineTo(t,u+.5),e.stroke();const s=n*.49,r=n*.33,a=this.samples.length,o=t/(a-1);e.save(),e.strokeStyle="#5ef2d0",e.lineWidth=2,e.shadowColor="rgba(94, 242, 208, 0.85)",e.shadowBlur=9,e.beginPath();for(let u=0;u<a;u++){const h=u*o,m=s-this.samples[u]*r;u===0?e.moveTo(h,m):e.lineTo(h,m)}e.stroke(),e.restore();const c=n*.875,l=n*.055;e.save(),e.strokeStyle="rgba(103, 232, 249, 0.45)",e.lineWidth=1.6,e.beginPath();for(let u=0;u<a;u++){const h=u*o,m=c-this.respSamples[u]*l;u===0?e.moveTo(h,m):e.lineTo(h,m)}e.stroke(),e.restore();const d=this.samples[a-1],f=s-d*r;e.fillStyle="#d9fff6",e.shadowColor="#5ef2d0",e.shadowBlur=12,e.beginPath(),e.arc(t-2,f,2.6,0,Yc),e.fill(),e.shadowBlur=0,e.fillStyle="rgba(126, 148, 171, 0.75)",e.font="10px ui-monospace, SFMono-Regular, monospace",e.fillText("ECG",3,12),e.fillText("RESP",3,n-4)}}const dl=[{id:"respiratoire",name:"Respiratoire",color:"#22d3ee",short:"Respirer, échanger l'oxygène",description:"Le nez, la trachée, les bronches et les poumons apportent l'oxygène au sang et évacuent le CO₂."},{id:"cardiovasculaire",name:"Cardiovasculaire",color:"#fb7185",short:"Faire circuler le sang",description:"Le cœur, les artères et les veines propulsent le sang, l'oxygène et les nutriments dans tout le corps."},{id:"digestif",name:"Digestif",color:"#fbbf24",short:"Décomposer, absorber, éliminer",description:"De la bouche au côlon, le tube digestif transforme les aliments et absorbe les nutriments."},{id:"nerveux",name:"Nerveux",color:"#a78bfa",short:"Penser, sentir, commander",description:"Le cerveau, la moelle épinière et les nerfs traitent l'information et commandent les mouvements."},{id:"urinaire",name:"Urinaire",color:"#60a5fa",short:"Filtrer et évacuer",description:"Les reins filtrent le sang, les uretères transportent l'urine et la vessie la stocke."},{id:"immunitaire",name:"Immunitaire",color:"#34d399",short:"Défendre l'organisme",description:"La rate, les ganglions et les cellules immunitaires surveillent et défendent le corps."},{id:"endocrinien",name:"Endocrinien",color:"#f472b6",short:"Réguler par les hormones",description:"Les glandes sécrètent des hormones qui pilotent la croissance, le sucre sanguin, le stress…"},{id:"squelettique",name:"Squelettique",color:"#e5ddc8",short:"Soutenir et protéger",description:"Les 206 os forment la charpente du corps, protègent les organes et fabriquent les cellules du sang."},{id:"musculaire",name:"Musculaire",color:"#ef4444",short:"Bouger et produire de la chaleur",description:"Les muscles squelettiques, attachés aux os par les tendons, produisent les mouvements volontaires."}],ci=Object.fromEntries(dl.map(i=>[i.id,i])),Kv={cerveau:"le",cervelet:"le",tronc_cerebral:"le",moelle_epiniere:"la",coeur:"le",coronaires:"les",aorte:"l'",poumons:"les",bronches:"les",oesophage:"l'",estomac:"l'",foie:"le",vesicule:"la",pancreas:"le",intestin_grele:"l'",colon:"le",reins:"les",ureteres:"les",vessie:"la",rate:"la",thyroide:"la",surrenales:"les",crane:"le",colonne:"la",cotes:"les",bassin:"le",omoplate:"l'",clavicule:"la",humerus:"l'",avant_bras:"l'",main:"la",femur:"le",rotule:"la",tibia:"le",pied:"le",trapezes:"les",deltoides:"les",pectoraux:"les",dorsaux:"les",abdominaux:"les",obliques:"les",biceps:"le",triceps:"le",fessiers:"les",quadriceps:"le",ischio_jambiers:"les",mollets:"les"};function Kc(i){const e=Kv[i.id]||"le",t=i.name.charAt(0).toLowerCase()+i.name.slice(1);return e==="l'"?`l'${t}`:`${e} ${t}`}function Wu(i){return Hn.filter(e=>e.effects.some(t=>t.target===i))}function jr(i){return ci[i]?.name||i}function ea(i){return ci[i]?.color||"#67e8f9"}function Zv(i,e){if(!i||e<=.01)return{...Ot};const t=Math.max(0,Math.min(1,e)),n=(s,r)=>Math.round((s+(r-s)*t)*10)/10;return{hr:Math.round(n(Ot.hr,i.vitals.hr)),spo2:Math.round(n(Ot.spo2,i.vitals.spo2)),rr:Math.round(n(Ot.rr,i.vitals.rr)),sbp:Math.round(n(Ot.sbp,i.vitals.sbp)),dbp:Math.round(n(Ot.dbp,i.vitals.dbp)),temp:Math.round(n(Ot.temp,i.vitals.temp)*10)/10}}function Jv(i){return`
    <button class="sys-chip ${i==="all"?"active":""}" data-system="all">
      <i style="--c:#94a3b8"></i>Tous
    </button>`+dl.map(t=>`
      <button class="sys-chip ${i===t.id?"active":""}" data-system="${t.id}" style="--c:${t.color}">
        <i></i>${t.name}
      </button>`).join("")}function Qv({entries:i,activeId:e,system:t,query:n,kind:s}){const r=n.trim().toLowerCase(),a=i.filter(l=>!(t!=="all"&&l.system!==t||r&&!`${l.name} ${l.latin} ${jr(l.system)}`.toLowerCase().includes(r))),o=r?Hn.filter(l=>(t==="all"||l.system===t)&&`${l.name} ${l.tagline} ${l.symptoms.join(" ")}`.toLowerCase().includes(r)):[];let c="";return o.length&&(c+=`<div class="list-subhead">Maladies · ${o.length}</div>`,c+=o.slice(0,8).map(l=>`
      <button class="entity-item disease ${e===l.id?"active":""}" data-disease="${l.id}">
        <span class="entity-dot" style="--c:${ea(l.system)}"></span>
        <span class="entity-main"><strong>${l.name}</strong><em>${ci[l.system].name} · pathologie</em></span>
        <span class="chev">›</span>
      </button>`).join("")),a.length&&(c+=r||o.length?`<div class="list-subhead">Anatomie · ${a.length}</div>`:"",c+=a.map(l=>{const d=Wu(l.id).length,f=l.kind==="organ"?`${l.region} · ${d} maladie${d>1?"s":""}`:`${l.region} · ${l.kind==="bone"?"os":"muscle"}`;return`
        <button class="entity-item ${e===l.id?"active":""}" data-organ="${l.id}">
          <span class="entity-dot" style="--c:${l.color}"></span>
          <span class="entity-main"><strong>${l.name}</strong><em>${f}</em></span>
          <span class="chev">›</span>
        </button>`}).join("")),c||(c=`<div class="empty-state"><span>⌕</span><p>Aucun résultat pour ${r?`« ${n} »`:"ce filtre"}.</p><small>Essayez un autre système ou l'onglet « Tout ».</small></div>`),c}function jv(i,{system:e,query:t,kind:n}){const s=t.trim().toLowerCase(),r=i.filter(o=>!(n!=="all"&&o.kind!==n||e!=="all"&&o.system!==e||s&&!`${o.name} ${o.latin} ${jr(o.system)}`.toLowerCase().includes(s))).length,a=s?Hn.filter(o=>(e==="all"||o.system===e)&&`${o.name} ${o.tagline} ${o.symptoms.join(" ")}`.toLowerCase().includes(s)).length:0;return r+Math.min(a,8)}function e_({stats:i,featured:e,bestDiag:t,bestHunt:n}){return`
    <div class="home-hero">
      <div class="eyebrow"><span class="eyebrow-line"></span>ATLAS INTERACTIF · 3D</div>
      <h2>Explorez le corps.<br /><span>Voyez la maladie.</span></h2>
      <p>
        Un jumeau numérique pour comprendre l'anatomie et visualiser, organe par organe,
        ce qu'une pathologie modifie vraiment.
      </p>
      <div class="stats">
        <div class="stat"><b>${i.organs}</b><span>organes</span></div>
        <div class="stat"><b>${i.diseases}</b><span>pathologies</span></div>
        <div class="stat"><b>${i.systems}</b><span>systèmes</span></div>
      </div>
    </div>

    <section class="panel-block">
      <div class="block-head"><h3>Cas d'étude</h3><span class="muted">cliquez pour simuler</span></div>
      <div class="case-list">
        ${e.map(s=>`
          <button class="case-card" data-disease="${s.id}" style="--c:${ea(s.system)}">
            <span class="case-top"><i></i>${ci[s.system].name}</span>
            <strong>${s.name}</strong>
            <em>${s.tagline}</em>
            <span class="case-cta">Visualiser l'effet <b>→</b></span>
          </button>`).join("")}
      </div>
    </section>

    <section class="panel-block">
      <div class="block-head"><h3>Comment explorer</h3></div>
      <ol class="steps">
        <li><b>1</b><div><strong>Tournez le corps</strong><span>Glissez pour l'orbite, molette pour zoomer, cliquez un organe.</span></div></li>
        <li><b>2</b><div><strong>Changez de couche</strong><span>Peau, muscles, squelette ou organes : chaque système se révèle.</span></div></li>
        <li><b>3</b><div><strong>Simulez une maladie</strong><span>Réglez la gravité et observez l'organe atteint en temps réel.</span></div></li>
        <li><b>4</b><div><strong>Éclatez, isolez, comparez</strong><span>Vue éclatée, isolement d'un organe et bascule sain / malade.</span></div></li>
      </ol>
    </section>

    <section class="panel-block games-block">
      <div class="block-head"><h3>Apprendre en jouant</h3></div>
      <div class="game-card">
        <div><span class="tag">DIAGNOSTIC</span><strong>Le patient présente…</strong><p>Identifiez la maladie à partir des symptômes et des constantes.</p></div>
        <button class="btn btn-primary small" data-quiz>Jouer</button>
      </div>
      <div class="game-card">
        <div><span class="tag teal">ANATOMIE</span><strong>Chasse aux organes</strong><p>Retrouvez l'organe demandé sur le corps en 90 secondes.</p></div>
        <button class="btn btn-ghost small" data-hunt>Jouer</button>
      </div>
      <div class="best-scores">
        <span>Meilleurs scores</span>
        <b>Diagnostic ${t}</b>
        <b>Chasse ${n}</b>
      </div>
    </section>

    <section class="panel-block install-block" data-install-block>
      <div class="block-head"><h3>Sur votre téléphone</h3><span class="muted">PWA</span></div>
      <p class="muted small">
        Installez CORPS sur l'écran d'accueil : ouverture plein écran, icône dédiée
        et accès hors ligne après la première visite.
      </p>
      <button class="btn btn-ghost small" data-install>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none"><path d="M12 3v12m0 0 4-4m-4 4-4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 17v2.5h14V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        Installer l'application
      </button>
    </section>

    <section class="panel-block credits-block">
      <div class="block-head"><h3>Sources &amp; crédits</h3></div>
      <p class="muted small">
        Anatomie 3D dérivée de <strong>BodyParts3D 4.0</strong> (Database Center for Life Science,
        licence CC BY 4.0), complétée pour la thyroïde, le grand dorsal, les abdominaux et les
        obliques par des maillages <strong>Z-Anatomy</strong> (licence CC BY-SA 4.0), avec une
        anatomie procédurale de secours. Les maillages combinés sont distribués sous CC BY-SA 4.0&nbsp;;
        le code reste sous MIT. Contenus pédagogiques originaux. Inspiré par des projets libres
        d'anatomie 3D&nbsp;:
      </p>
      <ul class="credit-list">
        <li>
          <a href="https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html" target="_blank" rel="noopener noreferrer">BodyParts3D 4.0</a>
          <span>maillages anatomiques — © The Database Center for Life Science, CC BY 4.0</span>
        </li>
        <li>
          <a href="https://github.com/ashemag/human-atlas" target="_blank" rel="noopener noreferrer">ashemag/human-atlas</a>
          <span>vue éclatée, isolement, comparaison sain / malade</span>
        </li>
        <li>
          <a href="https://github.com/Z-Anatomy/Models-of-human-anatomy" target="_blank" rel="noopener noreferrer">Z-Anatomy</a>
          <span>thyroïde, grand dorsal, abdominaux, obliques — CC BY-SA 4.0</span>
        </li>
        <li>
          <a href="https://anatomyatelier.org/" target="_blank" rel="noopener noreferrer">anatomyatelier.org</a>
          <span>inspiration pédagogique</span>
        </li>
      </ul>
      <p class="muted small">
        Code source&nbsp;:
        <a href="https://github.com/Tasour/corps-humain" target="_blank" rel="noopener noreferrer">github.com/Tasour/corps-humain</a>
      </p>
    </section>

    <p class="disclaimer">Outil pédagogique de visualisation. Il ne remplace ni un diagnostic ni un avis médical.</p>
  `}function t_(i,e,{isolated:t=!1}={}){const n=i.kind==="bone",s=i.kind==="muscle",r=ci[i.system],a=n||s?i.role:i.function;return`
    <button class="back-link" data-back>← Retour</button>
    <div class="entity-head">
      <div class="entity-mark ${i.kind}" style="--c:${i.color}">
        ${n?"OS":s?"MU":"OR"}
      </div>
      <div>
        <div class="badges">
          <span class="badge" style="--c:${r.color}"><i></i>${r.name}</span>
          <span class="badge ghost">${n?"Squelette":s?"Muscle":i.region}</span>
        </div>
        <h2>${i.name}</h2>
        <span class="latin">${i.latin}</span>
      </div>
    </div>

    <div class="entity-actions">
      <button class="btn btn-ghost small" data-focus="${i.id}">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        Focaliser
      </button>
      <button class="btn btn-ghost small ${t?"active":""}" data-isolate="${i.id}" aria-pressed="${t}">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none"><path d="M12 3 20 7v10l-8 4-8-4V7l8-4Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="m4 7 8 4 8-4M12 11v10" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
        ${t?"Tout afficher":"Isoler"}
      </button>
      <button class="btn btn-ghost small" data-system-jump="${i.system}">
        Voir le système
      </button>
    </div>

    <section class="panel-block tight">
      <h3>${n||s?"Rôle":"Fonction"}</h3>
      <p class="lead">${a}</p>
      <p>${i.description}</p>
    </section>

    <div class="funfact">
      <span class="ff-label">LE SAVIEZ-VOUS ?</span>
      <p>${i.funFact}</p>
    </div>

    <section class="panel-block">
      <div class="block-head"><h3>Pathologies associées</h3><span class="muted">${e.length}</span></div>
      ${e.length?`<div class="mini-list">${e.map(o=>`
              <button class="mini-disease" data-disease="${o.id}" style="--c:${ea(o.system)}">
                <span class="mini-dot"></span>
                <span><strong>${o.name}</strong><em>${o.tagline}</em></span>
                <b>›</b>
              </button>`).join("")}</div>`:`<p class="muted small">Aucune pathologie de cette démonstration ne cible directement cet élément. Explorez les autres organes du système ${r.name.toLowerCase()}.</p>`}
    </section>

    ${i.kind==="organ"?`<section class="panel-block tight"><h3>Repères</h3><div class="meta-grid">
            <div><span>Région</span><b>${i.region}</b></div>
            <div><span>Système</span><b>${r.name}</b></div>
            <div><span>Nom latin</span><b>${i.latin}</b></div>
            <div><span>Pathologies</span><b>${e.length}</b></div>
          </div></section>`:""}
  `}function Xu(i){return i<=.01?-1:Math.min(2,Math.floor(i*3))}function n_(i,e,t,{comparing:n=!1}={}){const s=ci[i.system],r=i.stages,a=Xu(e),o=Zv(i,e),c=a>=0?r[a]:null;return`
    <button class="back-link" data-back>← Retour</button>

    <div class="disease-head">
      <div class="badges">
        <span class="badge" style="--c:${s.color}"><i></i>${s.name}</span>
        <span class="badge ghost">${i.course}</span>
        <span class="badge ghost">${i.frequency}</span>
      </div>
      <h2>${i.name}</h2>
      <p class="tagline">${i.tagline}</p>
    </div>

    <div class="severity-card">
      <div class="sev-head">
        <span>Gravité simulée</span>
        <b><span id="sev-value">${Math.round(e*100)}</span> %</b>
      </div>
      <input id="severity" class="range" type="range" min="0" max="100" step="1" value="${Math.round(e*100)}" aria-label="Gravité de la pathologie" />
      <div class="sev-track-labels">
        <span class="${a<0?"on":""}">Sain</span>
        ${r.map((l,d)=>`<span class="${a===d?"on":""}">${l.label}</span>`).join("")}
      </div>
      <div class="sev-note" id="sev-note">
        ${c?`<b>${c.label}</b><p>${c.text}</p>`:"<b>État physiologique normal</b><p>Faites glisser le curseur pour déclencher la pathologie sur le modèle.</p>"}
      </div>
      <button class="btn btn-ghost small compare-btn ${n?"active":""}" data-compare aria-pressed="${n}">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none"><path d="M12 3v18M7 7 3 12l4 5M17 7l4 5-4 5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        ${n?"Revoir la pathologie":"Comparer sain / malade"}
      </button>
    </div>

    <div class="vitals-inline">
      <div><span>FC</span><b class="${o.hr>100?"rose":""}">${o.hr}</b><em>bpm</em></div>
      <div><span>SpO₂</span><b class="${o.spo2<92?"rose":""}">${o.spo2}</b><em>%</em></div>
      <div><span>FR</span><b class="${o.rr>20?"amber":""}">${o.rr}</b><em>/min</em></div>
      <div><span>TA</span><b>${o.sbp}/${o.dbp}</b><em>mmHg</em></div>
      <div><span>T°</span><b class="${o.temp>37.6?"amber":""}">${o.temp.toFixed(1).replace(".",",")}</b><em>°C</em></div>
    </div>

    <section class="panel-block">
      <div class="block-head"><h3>Impact sur le corps</h3><span class="muted">temps réel</span></div>
      <div class="effects">
        ${i.effects.map(l=>{const d=l.target,f=Math.round(l.amount*e*100);return`
            <div class="effect" data-organ="${d}">
              <div class="effect-head">
                <strong>${t[d]?.name||d}</strong>
                <span class="effect-tag">${qu[l.type]||l.type}</span>
                <b class="effect-pct">${f}%</b>
              </div>
              <div class="bar"><i class="effect-bar" data-amount="${l.amount}" style="width:${f}%"></i></div>
              <p>${l.note}</p>
            </div>`}).join("")}
      </div>
      <p class="sim-hint">
        <span class="pulse-dot"></span> Le modèle 3D et le moniteur se mettent à jour avec la gravité.
      </p>
    </section>

    <section class="panel-block">
      <h3>Ce qui se passe</h3>
      <p>${i.mechanism}</p>
      <p class="muted">${i.description}</p>
    </section>

    <section class="panel-block">
      <h3>Symptômes</h3>
      <div class="chips">
        ${i.symptoms.map(l=>`<span class="chip symptom">${l}</span>`).join("")}
      </div>
    </section>

    <div class="folds">
      <details class="fold">
        <summary><span>Causes</span><b>${i.causes.length}</b></summary>
        <ul>${i.causes.map(l=>`<li>${l}</li>`).join("")}</ul>
      </details>
      <details class="fold">
        <summary><span>Prises en charge</span><b>${i.treatments.length}</b></summary>
        <ul class="check">${i.treatments.map(l=>`<li>${l}</li>`).join("")}</ul>
        <p class="fold-note">Information pédagogique, pas une prescription.</p>
      </details>
      <details class="fold">
        <summary><span>Prévention</span><b>${i.prevention.length}</b></summary>
        <ul class="shield">${i.prevention.map(l=>`<li>${l}</li>`).join("")}</ul>
      </details>
    </div>

    <div class="funfact">
      <span class="ff-label">À RETENIR</span>
      <p>${i.fact}</p>
    </div>

    <div class="entity-actions end">
      <button class="btn btn-ghost small" data-focus="${i.effects[0].target}">Voir l'organe atteint</button>
      <button class="btn btn-primary small" data-quiz>Me tester</button>
    </div>

    <p class="disclaimer">Outil pédagogique. En cas de symptômes réels, consultez un professionnel de santé.</p>
  `}function i_(i,e){const t=Xu(e);return t>=0?{title:i.stages[t].label,text:i.stages[t].text}:{title:"État physiologique normal",text:"Faites glisser le curseur pour déclencher la pathologie sur le modèle."}}const Ir=i=>{const e=[...i];for(let t=e.length-1;t>0;t--){const n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}return e},Zc=(i,e)=>Ir(i).slice(0,e);function Uo(i){try{return Number(localStorage.getItem(i))||0}catch{return 0}}function s_(i,e){try{const t=Uo(i);e>t&&localStorage.setItem(i,String(e))}catch{}}class r_{constructor(e){this.opts=e,this.score=0,this.streak=0,this.caseNo=0,this.answered=0,this.best=Uo("corps.best.diag"),this.current=null,this.recent=[],this.active=!1}start(){this.active=!0,this.score=0,this.streak=0,this.caseNo=0,this.answered=0,this.recent=[],this.nextCase()}nextCase(){const e=Hn.filter(o=>!this.recent.includes(o.id)),t=Zc(e.length?e:Hn,1)[0];this.recent.push(t.id),this.recent.length>6&&this.recent.shift();const n=Ir(Hn.filter(o=>o.system===t.system&&o.id!==t.id)),s=Ir(Hn.filter(o=>o.id!==t.id&&o.system!==t.system)),r=n.slice(0,2);for(;r.length<3;)r.push(s.pop());const a=Ir([t,...r.slice(0,3)]);this.current={disease:t,options:a,symptoms:Zc(t.symptoms,4),answered:!1,chosen:null},this.caseNo++,this.opts.clearBody(),this.opts.onChange()}answer(e){if(!this.current||this.current.answered)return;const t=this.current;t.answered=!0,t.chosen=e;const n=e===t.disease.id;let s=0;n?(s=10+this.streak*2,this.score+=s,this.streak++,this.answered++,s_("corps.best.diag",this.score),this.best=Uo("corps.best.diag")):this.streak=0,t.points=s,t.correct=n,this.opts.showDisease(t.disease,.7),this.opts.focusDisease?this.opts.focusDisease(t.disease):this.opts.focus(t.disease.effects[0].target),this.opts.onChange(),n?this.opts.toast(`Bonne réponse · +${s} pts`,"ok"):this.opts.toast("Ce n'était pas le bon diagnostic","err")}render(e){if(!this.current)return;const{disease:t,options:n,symptoms:s,answered:r,chosen:a,correct:o,points:c}=this.current,l=this.opts.entries,d=t.vitals;[...new Set(t.effects.map(u=>l[u.target]?.name||u.target))];const f=n.map((u,h)=>{let m="option";return r&&(u.id===t.id?m+=" correct":u.id===a?m+=" wrong":m+=" faded"),`<button class="${m}" data-answer="${u.id}" ${r?"disabled":""}>
          <span class="letter">${String.fromCharCode(65+h)}</span>
          <span class="opt-name">${u.name}</span>
          <span class="opt-sys" style="--c:${ea(u.system)}">${ci[u.system].name}</span>
        </button>`}).join("");e.innerHTML=`
      <div class="quiz-head">
        <div>
          <span class="tag teal">MODE DIAGNOSTIC</span>
          <h2>Cas clinique</h2>
        </div>
        <button class="icon-btn" data-quiz-exit aria-label="Quitter">✕</button>
      </div>

      <div class="quiz-stats">
        <div><span>Score</span><b>${this.score}</b></div>
        <div><span>Série</span><b>×${this.streak}</b></div>
        <div><span>Cas</span><b>${this.caseNo}</b></div>
        <div><span>Record</span><b>${this.best}</b></div>
      </div>

      <div class="quiz-case">
        <div class="case-label"><span class="pulse-dot"></span> LE PATIENT PRÉSENTE</div>
        <div class="chips quiz-symptoms">
          ${s.map(u=>`<span class="chip symptom">${u}</span>`).join("")}
        </div>
        <div class="quiz-vitals">
          <div><span>FC</span><b>${d.hr}</b><em>bpm</em></div>
          <div><span>SpO₂</span><b>${d.spo2}</b><em>%</em></div>
          <div><span>FR</span><b>${d.rr}</b><em>/min</em></div>
          <div><span>T°</span><b>${d.temp.toFixed(1).replace(".",",")}</b><em>°C</em></div>
        </div>
      </div>

      <p class="quiz-question">Quel diagnostic retenez-vous ?</p>
      <div class="options">${f}</div>

      ${r?`<div class="quiz-result ${o?"ok":"bad"}">
              <div class="qr-head">
                <span class="qr-icon">${o?"✓":"✕"}</span>
                <div>
                  <b>${o?"Diagnostic exact":"Diagnostic manqué"}</b>
                  <span>${o?`+${c} points`:`La réponse était ${t.name}`}</span>
                </div>
              </div>
              <p class="qr-mech">${t.mechanism}</p>
              <div class="qr-organs">
                <span>Organes clés</span>
                ${t.effects.map(u=>{const h=l[u.target]?.name||u.target;return`<button data-organ="${u.target}">${h} · ${qu[u.type]||u.type}</button>`}).join("")}
              </div>
              <div class="qr-actions">
                <button class="btn btn-ghost small" data-focus="${t.effects[0].target}">Voir sur le corps</button>
                <button class="btn btn-primary small" data-next>Cas suivant →</button>
              </div>
            </div>`:'<p class="quiz-hint">Une seule réponse. Chaque bonne réponse augmente votre série et votre score.</p>'}

      <p class="disclaimer">Cas pédagogiques fictifs. Ne posez jamais de diagnostic sur cette base.</p>
    `,e.querySelectorAll("[data-answer]").forEach(u=>{u.addEventListener("click",()=>this.answer(u.dataset.answer))}),e.querySelector("[data-next]")?.addEventListener("click",()=>this.nextCase()),e.querySelector("[data-quiz-exit]")?.addEventListener("click",()=>this.opts.exit()),e.querySelector("[data-focus]")?.addEventListener("click",u=>{this.opts.focus(u.currentTarget.dataset.focus)}),e.querySelectorAll("[data-organ]").forEach(u=>{u.addEventListener("click",()=>this.opts.openOrgan(u.dataset.organ))})}finish(){this.active=!1,this.opts.clearBody()}}class a_{constructor({entries:e,scene:t,els:n,toast:s,onFinish:r}){this.entries=e,this.scene=t,this.els=n,this.toast=s||(()=>{}),this.onFinish=r||(()=>{}),this.active=!1,this.lock=!1,this.timeLeft=90,this.duration=90,this.score=0,this.streak=0,this.found=0,this.target=null,this.lastTarget=null;const a=new Set(["cerveau","cervelet","moelle_epiniere","coeur","aorte","poumons","estomac","foie","intestin_grele","colon","reins","vessie","rate","thyroide"]);this.pool=Object.values(e).filter(o=>o.kind==="organ"&&a.has(o.id))}start(){this.active=!0,this.lock=!1,this.timeLeft=this.duration,this.score=0,this.streak=0,this.found=0,this.lastTarget=null,this.els.hud.hidden=!1,this.els.hud.classList.remove("finished"),this.nextTarget()}nextTarget(){let e=this.pool.filter(n=>n.id!==this.lastTarget?.id);const t=e[Math.floor(Math.random()*e.length)];this.target=t,this.lastTarget=t,this.els.name.textContent=Kc(t),this.els.sub.textContent="Cliquez sur l'élément dans le corps 3D",this.updateHUD()}pick(e){if(!this.active||this.lock||!this.target)return;const t=this.entries[e];if(t)if(e===this.target.id){this.lock=!0;const n=10+this.streak*3;this.score+=n,this.streak++,this.found++,this.scene.flashEntry(e,!0),this.toast(`Bien vu ! +${n} pts`,"ok"),this.els.sub.textContent=`Exact — ${this.target.name}`,this.updateHUD(),setTimeout(()=>{this.lock=!1,this.active&&this.nextTarget()},620)}else{this.streak=0,this.timeLeft=Math.max(0,this.timeLeft-2),this.scene.flashEntry(e,!1);const n=ci[this.target.system]?.name||"";this.toast(`Raté · ${t.name} n'est pas ${Kc(this.target)}`,"err"),this.els.sub.textContent=`Indice : ${n} · ${this.target.region}`,this.updateHUD()}}update(e){this.active&&(this.timeLeft-=e,this.timeLeft<=0&&(this.timeLeft=0,this.finish()),this.updateHUD())}updateHUD(){if(!this.els.hud)return;this.els.score.textContent=`${this.score} pt${this.score>1?"s":""}`;const e=Math.max(0,this.timeLeft/this.duration*100);this.els.bar.style.width=`${e}%`,this.els.bar.classList.toggle("low",this.timeLeft<20),this.active&&this.els.time&&(this.els.time.textContent=`${Math.ceil(this.timeLeft)}s`)}finish(){this.active=!1,this.els.name&&(this.els.name.textContent="Temps écoulé"),this.els.sub&&(this.els.sub.textContent=`${this.found} élément${this.found>1?"s":""} trouvé${this.found>1?"s":""} · ${this.score} points`),this.els.hud?.classList.add("finished"),this.toast(`Partie terminée · ${this.score} points`,"info"),this.onFinish(this.score,this.found)}}let yi=null,Qi=()=>{};function $u(){return window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0}function Yu(){return/iphone|ipad|ipod/i.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}function o_(){return/android/i.test(navigator.userAgent)}function $i(){const i=$u(),e=!i&&(!!yi||Yu());document.querySelectorAll("[data-install-top]").forEach(t=>{t.hidden=!e}),document.querySelectorAll("[data-install-block]").forEach(t=>{t.hidden=i})}function l_({toast:i}={}){Qi=i||Qi,"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js",{scope:"./"}).catch(n=>console.warn("Service worker non enregistré :",n))}),$i(),window.addEventListener("beforeinstallprompt",n=>{n.preventDefault(),yi=n,$i()}),window.addEventListener("appinstalled",()=>{yi=null,$i(),Qi("CORPS est installé sur cet appareil","ok")}),window.matchMedia("(display-mode: standalone)").addEventListener?.("change",$i),document.addEventListener("click",n=>{if(n.target.closest("[data-install]")){n.preventDefault(),c_();return}n.target.closest("[data-install-close]")&&d_()});const e=document.getElementById("install-help");e?.addEventListener("click",n=>{n.target===e&&e.close()});const t=document.getElementById("right-content");t&&new MutationObserver($i).observe(t,{childList:!0,subtree:!0})}async function c_(){if($u()){Qi("CORPS est déjà installé sur cet appareil","info");return}if(yi){yi.prompt();const i=await yi.userChoice;yi=null,$i(),i.outcome==="accepted"&&Qi("Installation lancée","ok");return}u_()}function u_(){const i=document.getElementById("install-help"),e=document.getElementById("install-help-steps"),t=document.getElementById("install-help-lead");if(!i||!e){Qi("Utilisez le menu du navigateur pour installer cette page","info");return}const n=Yu(),s=o_();t.textContent=n?"Sur iPhone ou iPad, l'installation se fait depuis Safari, en quelques gestes.":s?"Sur Android, Chrome peut installer CORPS comme une application.":"Sur ordinateur, Chrome ou Edge peuvent installer CORPS dans une fenêtre dédiée.";const r=n?["Ouvrez cette page dans Safari.","Appuyez sur le bouton Partager (carré avec une flèche).","Choisissez « Sur l'écran d'accueil ».","Appuyez sur « Ajouter » pour confirmer."]:s?["Ouvrez le menu ⋮ de Chrome.","Choisissez « Installer l'application » ou « Ajouter à l'écran d'accueil ».","Confirmez l'installation."]:["Cliquez sur l'icône d'installation dans la barre d'adresse de Chrome ou Edge.","Ou ouvrez le menu ⋮ puis choisissez « Installer CORPS ».","L'application s'ouvre ensuite dans sa propre fenêtre."];e.innerHTML=r.map(a=>`<li>${a}</li>`).join(""),typeof i.showModal=="function"?i.showModal():i.setAttribute("open","")}function d_(){const i=document.getElementById("install-help");i&&(typeof i.close=="function"?i.close():i.removeAttribute("open"))}const ke=i=>document.querySelector(i),Ku=ke("#stage"),h_=ke("#labels"),f_=ke("#viewport");ke("#left-panel");const bi=ke("#right-content"),Zu=ke("#system-filter"),Ju=ke("#organ-list"),p_=ke("#list-count"),Gn=ke("#search"),xs=ke("#tooltip"),Ga=ke("#toast"),Va=ke("#active-path"),m_=ke("#ap-name"),ta=ke("#hunt-hud"),hl=ke("#app"),fl=ke("#monitor"),N={mode:"explore",view:"home",selectedId:null,activeDisease:null,severity:.65,system:"all",kind:"organ",query:"",layers:{skin:!0,muscles:!1,bones:!1,organs:!0},labels:!window.matchMedia("(max-width: 920px)").matches,autoRotate:!1,explode:!1,explodeAmount:0,crossSection:!1,isolatedId:null,compareOn:!1,severityBefore:.65};let Ms=null;const xe=new $v({stage:Ku,labels:h_,onSelect:i=>S_(i),onHover:(i,e,t)=>M_(i,e,t)}),Mn=xe.entries,Ti=new Yv(ke("#ecg"),{hr:ke("#v-hr"),spo2:ke("#v-spo2"),rr:ke("#v-rr"),bp:ke("#v-bp"),temp:ke("#v-temp"),note:ke("#monitor-note")});xe.onFrame=i=>{Ti.update(i,xe.getVitals(),xe.disease,xe.severity),N.mode==="hunt"&&ui.update(i)};const Ai=new r_({entries:Mn,clearBody:()=>{xe.clearDisease(),N.activeDisease=null,Ti.setDisease(null,0),wi()},showDisease:(i,e)=>Qu(i,e),focus:i=>{const e=Mn[i];e&&(Bs(e.kind),xe.focusEntry(i,.95))},focusDisease:i=>{const e=[...new Set(i.effects.map(t=>t.target))];for(const t of e){const n=Mn[t];n&&Bs(n.kind)}xe.focusEntries(e,1)},openOrgan:i=>{N.mode="explore",Ai.active=!1,N.view="entity",sa(i,{focus:!0})},onChange:()=>{Pt(),Dt()},toast:(i,e)=>rn(i,e),exit:()=>sd()}),ui=new a_({entries:Mn,scene:xe,els:{hud:ta,name:ke("#hunt-name"),sub:ke("#hunt-sub"),score:ke("#hunt-score"),bar:ke("#hunt-bar"),time:ke("#hunt-time")},toast:(i,e)=>rn(i,e),onFinish:i=>{try{i>(Number(localStorage.getItem("corps.best.hunt"))||0)&&localStorage.setItem("corps.best.hunt",String(i))}catch{}setTimeout(()=>{N.mode==="hunt"&&!ui.active&&pl(!0)},4800)}});function rn(i,e="info"){Ga.textContent=i,Ga.className=`toast show ${e}`,clearTimeout(rn._t),rn._t=setTimeout(()=>{Ga.className="toast"},2600)}function Bs(i){i==="bone"&&!N.layers.bones&&(N.layers.bones=!0),i==="muscle"&&!N.layers.muscles&&(N.layers.muscles=!0),i==="organ"&&!N.layers.organs&&(N.layers.organs=!0),di(),an()}function di(){for(const i of["skin","muscles","bones","organs"])xe.setLayer(i,N.layers[i]);xe.setLabels(N.labels)}function an(){document.querySelectorAll("#layers [data-layer]").forEach(s=>{const r=s.dataset.layer,a=r==="labels"?N.labels:N.layers[r];s.classList.toggle("active",!!a),s.setAttribute("aria-pressed",a?"true":"false")}),ke("#btn-rotate").classList.toggle("active",N.autoRotate);const i=ke("#btn-explode");i&&(i.classList.toggle("active",N.explode),i.setAttribute("aria-pressed",N.explode?"true":"false"));const e=ke("#explode-range");e&&(e.value=String(Math.round(N.explodeAmount*100)));const t=ke("#explode-value");t&&(t.textContent=`${Math.round(N.explodeAmount*100)} %`);const n=ke("#btn-section");n&&(n.classList.toggle("active",N.crossSection),n.setAttribute("aria-pressed",N.crossSection?"true":"false"))}function wi(){if(!N.activeDisease){Va.hidden=!0;return}const i=ss[N.activeDisease];if(!i){Va.hidden=!0;return}Va.hidden=!1,m_.textContent=`${i.name} · ${Math.round(N.severity*100)} %`}function Qu(i,e){N.activeDisease=i.id,N.severity=e,N.compareOn=!1;const t=new Set(i.effects.map(n=>Mn[n.target]?.kind).filter(Boolean));t.has("bone")&&(N.layers.bones=!0),t.has("muscle")&&(N.layers.muscles=!0),t.has("organ")&&(N.layers.organs=!0),di(),an(),xe.showDisease(i,e),Ti.setDisease(i,e),wi()}function na(){xe.clearDisease(),N.activeDisease=null,N.compareOn=!1,Ti.setDisease(null,0),wi()}function Pt(){Zu.innerHTML=Jv(N.system);const i=Object.values(Mn),e=N.kind==="all"?i:i.filter(n=>n.kind===N.kind);Ju.innerHTML=Qv({entries:e,activeId:N.mode==="quiz"?null:N.view==="entity"?N.selectedId:null,system:N.system,query:N.query,kind:N.kind});const t=jv(i,{system:N.system,query:N.query,kind:N.kind});p_.textContent=`${t} résultat${t>1?"s":""}`,document.querySelectorAll("#kind-filter .seg").forEach(n=>{n.classList.toggle("active",n.dataset.kind===N.kind)})}function Dt(){if(N.mode==="quiz"){Ai.render(bi);return}if(N.view==="disease"&&N.activeDisease){const i=ss[N.activeDisease];bi.innerHTML=n_(i,N.severity,Mn,{comparing:N.compareOn});return}if(N.view==="entity"&&N.selectedId){const i=Mn[N.selectedId],e=Wu(i.id);bi.innerHTML=t_(i,e,{isolated:N.isolatedId===i.id});return}bi.innerHTML=e_({stats:{organs:22,diseases:Hn.length,systems:dl.length},featured:["asthme","infarctus","cirrhose","parkinson"].map(i=>ss[i]),bestDiag:Jc("corps.best.diag"),bestHunt:Jc("corps.best.hunt")})}function Jc(i){try{return Number(localStorage.getItem(i))||0}catch{return 0}}function g_(i,{announce:e=!0}={}){ia(i?1:0,{announce:!1}),e&&rn(i?"Vue éclatée : chaque organe se détache":"Vue anatomique restaurée","info")}function ia(i,{announce:e=!1}={}){const t=Math.max(0,Math.min(1,i)),n=N.explodeAmount>.02,s=!!N.isolatedId;t>.001&&N.crossSection&&(N.crossSection=!1,xe.setCrossSection(!1)),N.explodeAmount=t,N.explode=t>.02,t>0&&(N.isolatedId=null,xe.isolateEntry(null)),xe.setExplodeAmount(t),an(),s&&Dt(),t<=.001?xe.setView("full"):n||requestAnimationFrame(()=>xe.frameAll(1.32+t*.3)),e&&rn(`Vue éclatée : ${Math.round(t*100)} %`,"info")}function v_(i,{announce:e=!0}={}){N.crossSection=i,i?(N.explodeAmount>0&&ia(0,{announce:!1}),Ri(),N.layers.organs=!0,N.layers.bones=!0,di(),an(),xe.setCrossSection(!0),xe.setView("full")):(xe.setCrossSection(!1),an()),N.view!=="home"&&Dt(),e&&rn(i?"Coupe anatomique : la partie avant est retirée":"Coupe anatomique désactivée","info")}function __(){N.mode="explore",N.view="home",N.selectedId=null,N.activeDisease=null,N.severity=.65,N.compareOn=!1,N.system="all",N.kind="organ",N.query="",N.layers={skin:!0,muscles:!1,bones:!1,organs:!0},N.labels=!window.matchMedia("(max-width: 920px)").matches,N.autoRotate=!1,N.explode=!1,N.explodeAmount=0,N.crossSection=!1,N.isolatedId=null,Gn.value="",Ai.active=!1,ui.active=!1,ta.hidden=!0,hl.classList.remove("playing"),fl.hidden=!1,xe.clearDisease(),xe.isolateEntry(null),xe.setExplodeAmount(0),xe.setCrossSection(!1),xe.setSystemFilter("all"),xe.setSelected(null),xe.setAutoRotate(!1),di(),an(),Pt(),Dt(),wi(),xe.setView("full"),rn("Scène réinitialisée","info")}function ju(){N.explodeAmount>0&&ia(0,{announce:!1}),N.crossSection&&(N.crossSection=!1,xe.setCrossSection(!1)),N.isolatedId&&(N.isolatedId=null,xe.isolateEntry(null)),an()}function Ri(){N.isolatedId&&(N.isolatedId=null,xe.isolateEntry(null))}function x_(i){const e=Mn[i];e&&(N.isolatedId===i?(Ri(),rn("Silhouette complète restaurée","info")):(Bs(e.kind),N.isolatedId=i,xe.isolateEntry(i),xe.setSelected(i),requestAnimationFrame(()=>xe.focusEntry(i,1.1)),rn(`${e.name} isolé · cliquez à nouveau pour tout afficher`,"info")),Dt())}function y_(){const i=ss[N.activeDisease];i&&(N.compareOn?(N.compareOn=!1,N.severity=N.severityBefore||.65):(N.severityBefore=N.severity||.65,N.compareOn=!0,N.severity=0),xe.setSeverity(N.severity),Ti.setDisease(i,N.severity),wi(),Dt())}function sa(i,{focus:e=!0}={}){const t=Mn[i];t&&(N.isolatedId&&N.isolatedId!==i&&Ri(),N.selectedId=i,N.view="entity",N.kind=t.kind,N.system!=="all"&&t.system!==N.system&&(N.system="all",xe.setSystemFilter("all")),Bs(t.kind),xe.setSelected(i),Pt(),Dt(),e&&requestAnimationFrame(()=>xe.focusEntry(i)))}function ed(i,{focus:e=!0}={}){const t=ss[i];if(t&&(Ri(),N.mode="explore",N.activeDisease=i,N.selectedId=null,N.view="disease",N.system="all",xe.setSystemFilter("all"),xe.setSelected(null),Qu(t,N.severity),Pt(),Dt(),e)){const n=[...new Set(t.effects.map(s=>s.target))];n.length&&requestAnimationFrame(()=>xe.focusEntries(n))}}function b_(){Ri(),N.view="home",N.selectedId=null,xe.setSelected(null),Pt(),Dt()}function td(){hl.classList.add("playing"),fl.hidden=!0,N.kind="organ",N.system="all",N.query="",Gn.value="",xe.setSystemFilter("all")}function nd(){hl.classList.remove("playing"),fl.hidden=!1,N.kind="organ",N.system="all",N.query="",Gn.value="",xe.setSystemFilter("all")}function id(){N.mode==="hunt"&&pl(!1),ju(),N.mode="quiz",N.view="home",N.selectedId=null,N.layers={skin:!0,muscles:!1,bones:!1,organs:!0},N.labels=!window.matchMedia("(max-width: 920px)").matches,di(),an(),xe.setSelected(null),na(),N.severity=.7,xe.setView("full"),td(),Ai.start(),Pt(),Dt()}function sd(){N.mode==="quiz"&&(Ai.active=!1,N.mode="explore",N.view="home",N.selectedId=null,na(),xe.setSelected(null),xe.setView("full"),nd(),Pt(),Dt())}function rd(){N.mode==="quiz"&&sd(),ju(),Ms={layers:{...N.layers},labels:N.labels},N.mode="hunt",N.view="home",N.selectedId=null,N.layers={skin:!0,muscles:!1,bones:!1,organs:!0},N.labels=!1,di(),an(),xe.setSelected(null),xe.setSystemFilter("all"),na(),xe.setView("full"),td(),Pt(),Dt(),ui.start()}function pl(i=!0){ui.active=!1,ta.hidden=!0,N.mode==="hunt"&&(N.mode="explore",i&&Ms&&(N.layers={...Ms.layers},N.labels=Ms.labels,di(),an()),Ms=null,nd(),Pt(),Dt())}function S_(i){if(N.mode==="hunt"){i&&ui.pick(i);return}if(N.mode!=="quiz"){if(!i){Ri(),N.view="home",N.selectedId=null,xe.setSelected(null),Pt(),Dt();return}sa(i,{focus:!1})}}function M_(i,e,t){if(!i||N.mode==="hunt"){xs.hidden=!0;return}const n=f_.getBoundingClientRect();xs.hidden=!1,xs.innerHTML=`<i style="--c:${i.color}"></i><strong>${i.name}</strong><span>${jr(i.system)}</span>`,xs.style.left=`${e-n.left+16}px`,xs.style.top=`${t-n.top+14}px`}document.querySelector("#layers").addEventListener("click",i=>{const e=i.target.closest("[data-layer]");if(e){const t=e.dataset.layer;t==="labels"?(N.labels=!N.labels,xe.setLabels(N.labels)):(N.layers[t]=!N.layers[t],xe.setLayer(t,N.layers[t])),an();return}i.target.closest("#btn-rotate")&&(N.autoRotate=!N.autoRotate,xe.setAutoRotate(N.autoRotate),an())});Zu.addEventListener("click",i=>{const e=i.target.closest("[data-system]");e&&(N.system=e.dataset.system,N.system==="squelettique"?N.kind="bone":N.system==="musculaire"?N.kind="muscle":N.system!=="all"&&N.kind!=="organ"&&(N.kind="organ"),xe.setSystemFilter(N.system),Pt())});document.querySelector("#kind-filter").addEventListener("click",i=>{const e=i.target.closest("[data-kind]");e&&(N.kind=e.dataset.kind,Pt())});Ju.addEventListener("click",i=>{const e=i.target.closest("[data-organ]");if(e){sa(e.dataset.organ);return}const t=i.target.closest("[data-disease]");t&&ed(t.dataset.disease)});Gn.addEventListener("input",()=>{N.query=Gn.value,Pt()});document.addEventListener("keydown",i=>{i.key==="/"&&!["INPUT","TEXTAREA"].includes(document.activeElement.tagName)&&(i.preventDefault(),Gn.focus()),i.key==="Escape"&&document.activeElement===Gn&&(Gn.value="",N.query="",Gn.blur(),Pt())});bi.addEventListener("click",i=>{const e=i.target.closest("[data-disease]");if(e){ed(e.dataset.disease);return}const t=i.target.closest("[data-organ]");if(t){N.mode!=="explore"&&(Ai.active=!1,ui.active=!1,ta.hidden=!0,N.mode="explore"),sa(t.dataset.organ);return}const n=i.target.closest("[data-focus]");if(n){const a=n.dataset.focus,o=Mn[a];o&&(Bs(o.kind),xe.setSelected(a),xe.focusEntry(a));return}const s=i.target.closest("[data-isolate]");if(s){x_(s.dataset.isolate);return}if(i.target.closest("[data-compare]")){y_();return}if(i.target.closest("[data-back]")){b_();return}const r=i.target.closest("[data-system-jump]");if(r){Ri(),N.system=r.dataset.systemJump,xe.setSystemFilter(N.system),N.kind="organ",Pt(),rn(`Filtre : ${jr(N.system)}`,"info");return}if(i.target.closest("[data-quiz]")){id();return}i.target.closest("[data-hunt]")&&rd()});bi.addEventListener("input",i=>{if(i.target.id!=="severity"||!N.activeDisease)return;const e=Number(i.target.value)/100;N.compareOn=!1,N.severity=e,xe.setSeverity(e);const t=ss[N.activeDisease];Ti.setDisease(t,e),wi(),E_(t,e)});bi.addEventListener("change",i=>{i.target.id!=="severity"||!N.activeDisease||Dt()});ke("#btn-quiz").addEventListener("click",id);ke("#btn-hunt").addEventListener("click",rd);ke("#btn-explode").addEventListener("click",()=>g_(!N.explode));const ys=ke("#explode-range");ys&&(ys.addEventListener("input",()=>{ia(Number(ys.value)/100)}),ys.addEventListener("change",()=>{const i=Number(ys.value)/100;i>.001&&requestAnimationFrame(()=>xe.frameAll(1.32+i*.3))}));ke("#btn-section")?.addEventListener("click",()=>v_(!N.crossSection));ke("#btn-reset-scene")?.addEventListener("click",__);ke("#hunt-quit").addEventListener("click",()=>pl(!0));ke("#ap-clear").addEventListener("click",()=>{na(),N.view==="disease"&&(N.view="home"),Pt(),Dt()});document.querySelector("#view-presets").addEventListener("click",i=>{const e=i.target.closest("[data-view]");e&&xe.setView(e.dataset.view)});function E_(i,e){const t=Math.round(e*100),n=document.getElementById("sev-value");n&&(n.textContent=t);const s=i_(i,e),r=document.getElementById("sev-note");r&&(r.innerHTML=`<b>${s.title}</b><p>${s.text}</p>`);const a=document.querySelectorAll(".sev-track-labels span"),o=e<=.01?-1:Math.min(2,Math.floor(e*3));a.forEach((c,l)=>{c.classList.toggle("on",l===0?o<0:o===l-1)}),document.querySelectorAll(".effect").forEach(c=>{const l=c.querySelector(".effect-bar");if(!l)return;const d=Number(l.dataset.amount)||0,f=Math.round(d*e*100);l.style.width=`${f}%`;const u=c.querySelector(".effect-pct");u&&(u.textContent=`${f}%`)})}new ResizeObserver(()=>xe.resize()).observe(Ku);window.addEventListener("resize",()=>xe.resize());an();di();Pt();Dt();wi();l_({toast:rn});window.__app={scene:xe,state:N,quiz:Ai,hunt:ui,monitor:Ti};setTimeout(()=>{N.mode==="explore"&&N.view==="home"&&rn("Cliquez sur un organe pour commencer l'exploration","info")},1600);
