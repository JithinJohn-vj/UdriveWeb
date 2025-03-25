import{r as h,j as e,B as w,T as b,P as c,W as j}from"./index-e2557835.js";import{N as y}from"./NavIconsDualtonned-629598de.js";import{C as P}from"./CustomBreadCrumps-190c0dc2.js";import{c as T,a as u,f as C}from"./index.esm-ebced901.js";import{u as S,h as R,T as x,d as q,c as m}from"./TagsInput-6b6695f6.js";import{o as N}from"./yup-08e917aa.js";import{j as k}from"./Mutations-138a202e.js";import{C as I}from"./CustomSubmitButton-a5ee7712.js";import{G as n}from"./Grid-f905a886.js";import"./Container-19e483a1.js";import"./Breadcrumbs-e71b08a1.js";import"./KeyboardArrowRight-ffd3b3e1.js";import"./numeral-d348d23e.js";import"./Select-c64a9698.js";import"./dayjs.min-6085eb1e.js";import"./AdapterDayjs-fefbe935.js";import"./Chip-7b8997d7.js";import"./CircularProgress-63df29d4.js";function p(r){const{children:i,value:a,index:s,...t}=r;return e.jsx("div",{role:"tabpanel",hidden:a!==s,id:`vertical-tabpanel-${s}`,"aria-labelledby":`vertical-tab-${s}`,...t,style:{justifyContent:"center",alignItems:"center",width:"100%",height:"100%"},children:a===s&&e.jsx(w,{sx:{p:3},children:e.jsx(b,{children:i})})})}p.propTypes={children:c.node,index:c.number.isRequired,value:c.number.isRequired};function f(r){return{id:`vertical-tab-${r}`,"aria-controls":`vertical-tabpanel-${r}`}}function E(){const[r,i]=h.useState(0),a=(d,g)=>{i(g)},s=k(),t=T().shape({oldPassword:u().required("Old password is required"),newPassword:u().required("New password is required"),confirmPassword:u().oneOf([C("newPassword"),null],"Passwords must match").required("Confirm Password is required")}),o=S({resolver:N(t)}),{handleSubmit:l}=o,v=d=>{s.mutate(d),console.log(d)};return e.jsxs(w,{sx:{flexGrow:1,bgcolor:"background.paper",display:"flex",height:224},children:[e.jsxs(R,{orientation:"vertical",variant:"scrollable",value:r,onChange:a,"aria-label":"Vertical tabs example",sx:{borderRight:1,borderColor:"divider",width:150},children:[e.jsx(x,{label:"Password",...f(0),sx:{fontSize:"17px"}}),e.jsx(x,{label:"About",...f(1),sx:{fontSize:"17px"}})]}),e.jsx(p,{value:r,index:0,children:e.jsxs("div",{className:"md:w-1/2 mx-auto",children:[e.jsx(b,{className:"hover:underline hover:cursor-pointer text-gray-500",variant:"h4",children:"Reset Password"}),e.jsx(q,{methods:o,onSubmit:l(v),children:e.jsx(n,{paddingBottom:2,container:!0,spacing:2,alignItems:"center",children:e.jsxs(e.Fragment,{children:[e.jsx(n,{marginTop:2,item:!0,xs:24,children:e.jsx(m,{name:"oldPassword",label:"Old password"})}),e.jsx(n,{marginTop:2,item:!0,xs:24,children:e.jsx(m,{name:"newPassword",label:"New password"})}),e.jsx(n,{marginTop:2,item:!0,xs:24,children:e.jsx(m,{name:"confirmPassword",label:"Confirm password"})}),e.jsx(I,{name:"Reset Password"})]})})})]})}),e.jsx(p,{value:r,index:1,children:e.jsx("div",{style:{width:"100%"},className:"",children:e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold text-3xl text-gray-500 mb-8",children:"U Drive Car Rentals"}),e.jsx("p",{className:"text-lg leading-9",children:"We are a Thrissur-based, professional self-drive car rental company that specialises in cars rentals in Thrissur and throughout Kerala. With more than a decade of expertise, we take great satisfaction in being the highest rated car rental company, providing excellent service to customers all over the world. We can assist you with car rentals in Thrissur for self-drive choices or airport car rentals. More than 100 vehicles make up our fleet, which includes normal, luxury, and budget vehicles with manual and automatic transmissions, as well as petrol and diesel alternatives. In addition to doorstep delivery and pickup in practically every area of Kerala, we offer convenient delivery and pickup services whenever needed at the airports in Kochi and Calicut. Our ultimate goal is to make renting a car easy and to offer reasonably priced, high-quality vehicles along with first-rate assistance during the whole procedure. Therefore,go no further than us if you're seeking for self-drive car rental in Thrissur or anyplace else in Kerala!"})]})})})]})}function Y(){var s,t;const r=y(),[i,a]=h.useState(!1);return h.useEffect(()=>{const l=window.location.href.includes("edit");a(!!l)},[window.location.pathname]),e.jsxs(e.Fragment,{children:[e.jsx(j,{children:e.jsx("title",{children:" Reset-Password | U-DRIVE"})}),e.jsx(P,{headText:"Settings",icon1:(s=r[0])==null?void 0:s.icon,icon2:(t=r[6])==null?void 0:t.icon,subname1:"Dashboard",subname2:"Settings",redirectlink:"/cars/list",redirectIcon:"ph:list-bold"}),e.jsx(E,{isEdit:i})]})}export{Y as default};
