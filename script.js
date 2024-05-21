const tb = document.getElementById("tb");
const btn = document.getElementById("add_btn");
const btns = document.getElementById("btns");
let count = 0;
let done_count = 1;
function add()
{
    var x = tb.value;
    if (count >= 5)
    {
        alert("Task Limit Reached");
    }
    else if (x != "" && count <= 5)
    {
        count++;
        let p = document.createElement("li");
        let d = document.createElement("div")
        let delbtn = document.createElement("button")
        delbtn.style.marginRight = "20px"
        let donebtn = document.createElement("button")
        donebtn.style.marginRight="20px"
        let editbtn = document.createElement("button")
        p.innerText = "" + x + "     "
        document.getElementById("list").appendChild(p).appendChild(d)
        d.appendChild(delbtn).innerText="❌"
        d.appendChild(donebtn).innerText="✅"
        d.appendChild(editbtn).innerText = "📝"
     function Done() {
            done_count++
         if (done_count % 2 == 0) {
             p.style.textDecoration = "line-through";
             p.style.textDecorationThickness = "5px"; 
         }
         else {
             p.style.textDecoration = "none";
            }
        }
    donebtn.addEventListener("click", Done);
     function dlt() {
         document.getElementById("list").removeChild(p)
         count--
         }
        delbtn.addEventListener("click", dlt);
        edit_count = 0;
        function edit() {
            edit_count++
            if (edit_count<2) {
                eb = document.createElement("button");
                eb.innerText = "✅";
                ed = document.createElement("input")
                p.appendChild(ed)
                p.appendChild(eb)
                ed.style.marginRight="10px";
                ed.value = x
                if (ed.value != "") {
                    function edone() {
                        z = ed.value
                        p.innerText = "" + z + "     "
                        p.appendChild(d)
                        edit_count--
                    }
                    eb.addEventListener("click", edone)
                }
            }
        }
        editbtn.addEventListener("click", edit)
}

    else {
            alert("please enter valid input")
        }
    tb.value = ""
}

btn.addEventListener("click", add);
