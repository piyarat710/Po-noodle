const noodleMenu = [
  {
    id: "chicken",
    name: "ก๋วยเตี๋ยวไก่",
    image: "/noodle014.jpg",
    basePrice: 40
  },
  {
    id: "pork",
    name: "ก๋วยเตี๋ยวหมู",
    image: "/noodle019.jpg",
    basePrice: 45
  },
  {
    id: "beef",
    name: "ก๋วยเตี๋ยวเนื้อ",
    image: "/noodle021.jpg",
    basePrice: 55
  },
  {
    id: "seafood",
    name: "ก๋วยเตี๋ยวทะเล",
    image: "/noodle020.jpg",
    basePrice: 60
  }
];

export const noodleOptions = {
  spicy: ["ไม่เผ็ด", "เผ็ดน้อย", "เผ็ดกลาง", "เผ็ดมาก"],
  soup: ["น้ำใส", "ต้มยำ", "น้ำตก", "เย็นตาโฟ", "เย็นตาโฟต้มยำ"],
  noodleType: ["เล็ก", "ใหญ่", "มาม่า", "วุ้นเส้น"],
  vegetable: ["ใส่", "ไม่ใส่"],
  size: [
    { name: "ปกติ", price: 0 },
    { name: "พิเศษ", price: 10 }
  ],
  topping: [
    { name: "ลูกชิ้นเพิ่ม", price: 10 },
    { name: "ไข่", price: 10 }
  ]
};

export default noodleMenu;
