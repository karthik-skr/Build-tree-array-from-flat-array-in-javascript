var data = [{"country":"india","gender":"male","type":"lower","class":"X"},
			{"country":"china","gender":"female","type":"upper"},
			{"country":"india","gender":"female","type":"lower"},
			{"country":"india","gender":"female","type":"upper"}];
var seq = ["country","type","gender","class"];
var treeData = createHieArr(data,seq);
console.log(treeData)
/*
@Output will be as shown below:
 [
  {
    "name": "Top Level",
    "parent": "null",
    "children": [
      {
        "name": "india",
        "parent": "Top Level",
        "children": [
          {
            "name": "male",
            "parent": "india"
			..........
          },
          {
            "name": "female",
            "parent": "india"
			...........
          }
        ]
      },
	  {
        "name": "china",
	  ...............
    ]
  }
];

*/
function createHieArr(data,seq){
	var hieObj = createHieobj(data,seq,0),
		hieArr = convertToHieArr(hieObj,"Top Level");
		return [{"name": "Top Level", "parent": "null",
				     "children" : hieArr}]
	function convertToHieArr(eachObj,parent){
		var arr = [];
		var parentName = "none";
		if(parent)
			parentName = parent;
		for(var i in eachObj){
			arr.push({"name":i,"parent":parentName,"children":convertToHieArr(eachObj[i],i)})
		}
		return arr;
	}
	function createHieobj(data,seq,ind){
		var s = seq[ind];
		if(s == undefined){
			return [];
		}
		var childObj = {};
		for(var ele of data){
			if(ele[s] != undefined){
				if(childObj[ele[s]] == undefined){
					childObj[ele[s]] = [];
				}
				childObj[ele[s]].push(ele);
			}
		}
		ind = ind+1;
		for(var ch in childObj){
			childObj[ch] = createHieobj(childObj[ch],seq,ind)
		}
		return childObj;
	}
}