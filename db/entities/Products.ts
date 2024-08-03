import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Shop } from "./Shop.js";
import { Category } from "./Category.js";

@Entity("product")
export class Product extends BaseEntity{
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({length:255})
    name: string

    @Column()
    price:number

    @ManyToOne(()=>Shop, shop=>shop.product)
    shop: Partial<Shop>

    @ManyToMany(()=>Category, category=>category.products)
    categories:Category[]

}