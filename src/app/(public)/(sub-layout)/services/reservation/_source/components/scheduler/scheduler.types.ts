export interface Room {
  id: string
  name: string
  floor: string
  building: string
}

export interface BuildingGroup {
  buildingName: string
  rooms: Room[]
}
