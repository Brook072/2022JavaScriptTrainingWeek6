// let itineraryData = [
//   {
//     "id": 0,
//     "name": "肥宅心碎賞櫻3日",
//     "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
//     "area": "高雄",
//     "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
//     "group": 87,
//     "price": 1400,
//     "rate": 10
//   },
//   {
//     "id": 1,
//     "name": "貓空纜車雙程票",
//     "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//     "area": "台北",
//     "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
//     "group": 99,
//     "price": 240,
//     "rate": 2
//   },
//   {
//     "id": 2,
//     "name": "台中谷關溫泉會1日",
//     "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//     "area": "台中",
//     "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
//     "group": 20,
//     "price": 1765,
//     "rate": 7
//   }
// ];

let itineraryData, lastDataItem
let addData = {};
let showData = [];
let areaSelected
const itineraryAddBtn = document.querySelector('.itineraryAddBtn')
const showDataAreaSelect = document.querySelector('.areaSelect')

axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json').then((res)=>{
  itineraryData = res.data.data
  showData = itineraryData;
}).catch((err)=>{
  console.log(err)
}).then(()=>{
  itineraryCardGenerate();
})


itineraryAddBtn.addEventListener('click', function(e){
  e.preventDefault();
  lastDataItem = itineraryData[itineraryData.length-1]
  addData = {
    'id': lastDataItem.id += 1,
    "name": document.getElementById('name').value,
    "imgUrl": document.getElementById('imgUrl').value,
    "area": document.getElementById('area').value,
    "description": document.getElementById('description').value,
    "group": document.getElementById('group').value,
    "price": document.getElementById('price').value,
    "rate": document.getElementById('rate').value
  }
  itineraryData.push(addData);
  document.getElementById('addItineraryForm').reset();
  itineraryCardGenerate();
})

showDataAreaSelect.addEventListener('change', function(e){
  areaSelected = e.target.value;
  showDataFilter();
  if(areaSelected === '') showData = itineraryData;
  itineraryCardGenerate();
})

function showDataFilter(){
  showData = itineraryData.filter((item)=>{
    if(item.area === areaSelected)
    return true
  })
}

function itineraryCardGenerate(){
  const cardWrapper = document.querySelector('.itineraryCardWrapper')
  const resultNumber = document.querySelector('.resultNumber')
  if(cardWrapper.innerHTML != '') cardWrapper.innerHTML = ''
  resultNumber.innerHTML = `本次搜尋共 ${showData.length} 筆資料`
  showData.forEach(function(i){
    cardWrapper.innerHTML += `
      <div class='w-full md:w-6/12 xl:w-4/12 px-3.75'>
        <div class="relative shadow-md rounded">
          <span class="absolute -top-2.5 bg-seaSerpent text-xl text-white leading-6 rounded-r py-2 px-5">${i.area}</span>
          <div>
              <img src="${i.imgUrl}" alt="" class="w-full h-full md:h-45 object-cover rounded-t">
          </div>
          <div class="relative px-5 pt-5 pb-3.5">
              <span class="absolute -top-4 left-0 bg-primary text-white leading-6 rounded-r py-1 px-2">${i.rate}</span>
              <h3 class="text-primary text-2xl font-medium pb-1 mb-4 border-b border-b-2 border-b-primary">${i.name}</h3>
              <div class='h-36'>
                <p class="text-tertiary text-base leading-6 mb-6">${i.description}</p>
              </div>
              <div class="flex justify-between items-center">
                  <div>
                      <span class="mdi mdi-alert-circle text-primary text-base font-medium mr-1"></span>
                      <span class="text-primary text-base font-medium">剩下最後${i.group}組</span>
                  </div>
                  <div class="flex items-center">
                      <span class="text-primary text-base mr-1">TWD</span>
                      <span class="text-primary text-4xl font-medium">$${i.price}</span>
                  </div>
              </div>
          </div>
        </div>
      </div>
      `
  })
}