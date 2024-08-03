import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Products.js";
import { Hotline } from "./Hotline.js";

@Entity("shop")
export class Shop extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ length: 255 })
    shopName: string

    @Column({ length: 255 })
    email: string

    @Column({ length: 255 })
    password: string

    @OneToMany(() => Product, product => product.shop)
    product: Partial<Product>[]

    @OneToOne(() => Hotline, hotline => hotline.shop)
    @JoinColumn({
        name:"hotlineId",
        referencedColumnName:"id"
    })
    hotline: Hotline

}