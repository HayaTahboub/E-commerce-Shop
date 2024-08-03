import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Products.js";

@Entity("category")
export class Category extends BaseEntity{
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({length:255})
    name: string

    @ManyToMany(()=>Product, product=>product.categories)
    @JoinTable({
        name:"product_category"
    })
    products:Product[]

}