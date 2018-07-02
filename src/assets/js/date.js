import range from './range'
const date = new Date()
let startDate = 1990
const END_YEAR = date.getFullYear()

const UNIT_YEAR = '年'
const UNIT_MONTH = '月'
const UNIT_DAY = '日'

function isLeapYear (y) {
  return (y % 4 === 0) && (y % 100 !== 0 || y % 400 === 0)
};

function getDays (y, m) {
    y = Number(y)
    m = Number(m)
    let endDay = null
    switch (m) {
        case 2:
          endDay = isLeapYear(y) ? 29 : 28; break
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          endDay = 31; break
        case 4:
        case 6:
        case 9:
        case 11:
        default:
        endDay = 30; break
    }
    if(END_YEAR==y && m==date.getMonth()+1){
        endDay = date.getDate();
    }
    const days = range(1, endDay, false, UNIT_DAY)
    return days.map((day) => {
        return { value: day }
    })
};

const yearData = range(startDate, END_YEAR, false, UNIT_YEAR)

const monthData = range(1, 12, false, UNIT_MONTH)

const cascadeMonthData = monthData.map((month) => {
  return {
    value: month,
    children: []
  }
})

const dateData = yearData.map((year) => {
    let everyMonth = cascadeMonthData.slice();
    if(year==END_YEAR+"年"){
        everyMonth = cascadeMonthData.slice(0,date.getMonth()+1);
    }
    const item = {
        value: year,
        children: everyMonth
    }
    item.children.forEach((month) => {
        month.children = getDays(year.slice(0, -1), month.value.slice(0, -1))
    })
    return item
})


const dateAnchor = [
  { value: `${date.getFullYear()-1}${UNIT_YEAR}` },
  { value: `${date.getMonth() + 1}${UNIT_MONTH}` },
  { value: `${date.getDate()}${UNIT_DAY}` }
]

export {
  dateAnchor,
  dateData
}
