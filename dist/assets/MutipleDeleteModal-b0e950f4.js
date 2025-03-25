import{s as e}from"./CustomModalMessages-21d53744.js";function c(l,r,o){if(!Array.isArray(o)||o.length===0){console.error("Invalid array of IDs provided");return}const n=()=>{l(o)};try{e({title:"Are you sure?",text:r?r[0]:"",className:"swal-main",icon:"warning",buttons:!0,dangerMode:!0,content:{element:"div",attributes:{innerHTML:`
            <style>
              .swal-title, .swal-text { color: white; text-align: center; }
              .swal-modal { background-color: black; border: 1px solid gray; }
              .swal-button--confirm { background-color: #75dbcf; }
              .swal-button--confirm:hover { background-color: darkgreen; }
            </style>`}}}).then(t=>{t?(n(),e(r?r[1]:"",{icon:"success",className:"swal-main",content:{element:"div",attributes:{innerHTML:`
                <style>
                  .swal-title, .swal-text { color: black; text-align: center; }
                  .swal-modal { background-color: white; border: 1px solid gray; }
                  .swal-button--confirm { background-color: #75dbcf; }
                  .swal-button--confirm:hover { background-color: darkgreen; }
                </style>`}}})):e(r?r[2]:"",{content:{element:"div",attributes:{innerHTML:`
                <style>
                  .swal-title, .swal-text { color: black; text-align: center; }
                  .swal-modal { background-color: white; border: 1px solid gray; }
                  .swal-button--confirm { background-color: #75dbcf; }
                  .swal-button--confirm:hover { background-color: darkgreen; }
                </style>`}}})})}catch(t){console.error(t)}}export{c as M};
