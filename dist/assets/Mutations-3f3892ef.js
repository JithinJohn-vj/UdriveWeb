import{u as l,b8 as n,b9 as a,aD as t,bl as r}from"./index-e2557835.js";import{c as i,e as c,d as m,f as C}from"./Queries-1edd9701.js";function f(){const u=l(),s=n();return a({mutationFn:e=>i(e),onMutate:()=>{console.log("mutate")},onSettled:async(e,o)=>{o?(console.log(o),t.error(o.message)):(t.success("Customer Created successfully"),u.push(r),await s.invalidateQueries({queryKey:["getCustomers"]}))}})}function g(){const u=n();return a({mutationFn:s=>i(s),onMutate:()=>{console.log("mutate")},onSettled:async(s,e)=>{e?(console.log(e),t.error(e.message)):(t.success("Customer Created successfully"),await u.invalidateQueries({queryKey:["getCustomers"]}))}})}function q(){const u=l(),s=n();return a({mutationFn:e=>c(e),onMutate:()=>{console.log("mutate")},onSettled:async(e,o)=>{o?t.error(o.message):(t.success("Customer Updated successfully"),u.push(r),await s.invalidateQueries({queryKey:["getCustomers"]}))}})}function p(){const u=n();return a({mutationFn:s=>m(s),onMutate:()=>{console.log("mutate")},onSettled:async(s,e)=>{e?t.error(e.message):(t.success("Customer Deleted successfully"),await u.invalidateQueries({queryKey:["getCustomers"]}))}})}function M(){const u=n();return a({mutationFn:s=>C(s),onMutate:()=>{console.log("mutate")},onSettled:async(s,e)=>{e?t.error(e.message):(t.success("Customers Deleted successfully"),await u.invalidateQueries({queryKey:["getCustomers"]}))}})}export{q as a,M as b,p as c,f as d,g as u};
