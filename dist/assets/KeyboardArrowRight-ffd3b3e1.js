import{O as N,N as O,s as w,ag as X,_ as i,aN as _,r as B,$ as E,J as Y,bX as D,j as s,a1 as U,Q as b,a3 as H,G as x,Y as Z,ah as ee}from"./index-e2557835.js";function oe(e){return N("PrivateSwitchBase",e)}O("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);const te=["autoFocus","checked","checkedIcon","className","defaultChecked","disabled","disableFocusRipple","edge","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"],se=e=>{const{classes:o,checked:t,disabled:r,edge:c}=e,n={root:["root",t&&"checked",r&&"disabled",c&&`edge${b(c)}`],input:["input"]};return H(n,oe,o)},ce=w(X)(({ownerState:e})=>i({padding:9,borderRadius:"50%"},e.edge==="start"&&{marginLeft:e.size==="small"?-3:-12},e.edge==="end"&&{marginRight:e.size==="small"?-3:-12})),ne=w("input",{shouldForwardProp:_})({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),ae=B.forwardRef(function(o,t){const{autoFocus:r,checked:c,checkedIcon:n,className:u,defaultChecked:C,disabled:z,disableFocusRipple:l=!1,edge:g=!1,icon:y,id:h,inputProps:$,inputRef:P,name:I,onBlur:p,onChange:f,onFocus:m,readOnly:K,required:A=!1,tabIndex:V,type:v,value:F}=o,q=E(o,te),[j,G]=Y({controlled:c,default:!!C,name:"SwitchBase",state:"checked"}),d=D(),J=a=>{m&&m(a),d&&d.onFocus&&d.onFocus(a)},Q=a=>{p&&p(a),d&&d.onBlur&&d.onBlur(a)},T=a=>{if(a.nativeEvent.defaultPrevented)return;const L=a.target.checked;G(L),f&&f(a,L)};let k=z;d&&typeof k>"u"&&(k=d.disabled);const W=v==="checkbox"||v==="radio",R=i({},o,{checked:j,disabled:k,disableFocusRipple:l,edge:g}),M=se(R);return s.jsxs(ce,i({component:"span",className:U(M.root,u),centerRipple:!0,focusRipple:!l,disabled:k,tabIndex:null,role:void 0,onFocus:J,onBlur:Q,ownerState:R,ref:t},q,{children:[s.jsx(ne,i({autoFocus:r,checked:c,defaultChecked:C,className:M.input,disabled:k,id:W?h:void 0,name:I,onChange:T,readOnly:K,ref:P,required:A,ownerState:R,tabIndex:V,type:v},v==="checkbox"&&F===void 0?{}:{value:F},$)),j?n:y]}))}),ie=ae,re=x(s.jsx("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),de=x(s.jsx("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),le=x(s.jsx("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox");function ue(e){return N("MuiCheckbox",e)}const he=O("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary","sizeSmall","sizeMedium"]),S=he,pe=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size","className"],fe=e=>{const{classes:o,indeterminate:t,color:r,size:c}=e,n={root:["root",t&&"indeterminate",`color${b(r)}`,`size${b(c)}`]},u=H(n,ue,o);return i({},o,u)},me=w(ie,{shouldForwardProp:e=>_(e)||e==="classes",name:"MuiCheckbox",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[o.root,t.indeterminate&&o.indeterminate,o[`size${b(t.size)}`],t.color!=="default"&&o[`color${b(t.color)}`]]}})(({theme:e,ownerState:o})=>i({color:(e.vars||e).palette.text.secondary},!o.disableRipple&&{"&:hover":{backgroundColor:e.vars?`rgba(${o.color==="default"?e.vars.palette.action.activeChannel:e.vars.palette[o.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:Z(o.color==="default"?e.palette.action.active:e.palette[o.color].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},o.color!=="default"&&{[`&.${S.checked}, &.${S.indeterminate}`]:{color:(e.vars||e).palette[o.color].main},[`&.${S.disabled}`]:{color:(e.vars||e).palette.action.disabled}})),ke=s.jsx(de,{}),be=s.jsx(re,{}),xe=s.jsx(le,{}),Ce=B.forwardRef(function(o,t){var r,c;const n=ee({props:o,name:"MuiCheckbox"}),{checkedIcon:u=ke,color:C="primary",icon:z=be,indeterminate:l=!1,indeterminateIcon:g=xe,inputProps:y,size:h="medium",className:$}=n,P=E(n,pe),I=l?g:z,p=l?g:u,f=i({},n,{color:C,indeterminate:l,size:h}),m=fe(f);return s.jsx(me,i({type:"checkbox",inputProps:i({"data-indeterminate":l},y),icon:B.cloneElement(I,{fontSize:(r=I.props.fontSize)!=null?r:h}),checkedIcon:B.cloneElement(p,{fontSize:(c=p.props.fontSize)!=null?c:h}),ownerState:f,ref:t,className:U(m.root,$)},P,{classes:m}))}),Ie=Ce,ve=x(s.jsx("path",{d:"M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"}),"KeyboardArrowLeft"),Be=x(s.jsx("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"}),"KeyboardArrowRight");export{Ie as C,Be as K,ie as S,ve as a};
