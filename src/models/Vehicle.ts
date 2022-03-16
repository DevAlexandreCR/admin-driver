import {VehicleInterface} from "@/entities/VehicleInterface";

export default class Vehicle implements VehicleInterface {
  brand: string
  model: string
  photoUrl: string|null
  plate: string
  
  constructor() {
    this.photoUrl = null
  }
}