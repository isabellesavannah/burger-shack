import express from "express";
import BaseController from "../utils/BaseController";
import { burgerService } from "../services/BurgerService";
import {MOCKDB} from "../db/MOCKDB"

export class BurgersController extends BaseController {
  constructor() {
    super("api/burgers");
    this.router
      .get("", this.getAll)
      .get("/:id", this.getOne)
      .post("", this.create)
      .delete("/:id", this.delete)
      .put("/:id", this.edit)
  }
  async getAll(req, res, next) {
    try {
      const burgers = burgerService.getAll()
      return res.send(burgers);
    } catch (error) {
      next(error);
    }
  }
  async getOne(req, res, next){
    try{
      res.send(burgerService.getOne(req.params.id))
    }catch(error){
      next(error)
    }
  }
  async create(req, res, next) {
      try {
      let newBurger = req.body
      const burger = burgerService.create(newBurger)
      res.status(201).send({data:burger, count: MOCKDB.burgers.length});
    } catch (error){
      next(error)
    }
  }
  async delete(req, res, next){
    try{
      const id = req.params.id
      burgerService.delete(id)
      res.send("Burger deleted")
    }catch(error){
      next(error)
    }
  }
  async edit(req, res, next){
    try{
      let editedBurger = req.body
      const burger = burgerService.edit(editedBurger, req.params.id)
      res.send(burger)
    }catch(error){
      next(error)
    }
  }
}