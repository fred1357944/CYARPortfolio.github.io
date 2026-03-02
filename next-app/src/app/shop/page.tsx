import Image from "next/image";
import { settings } from "@/data";
import styles from "./page.module.css";

export const metadata = {
    title: "Shop | VERSE(US) — 中原建築62屆",
};

export default function ShopPage() {
    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.header}>
                    <p className={styles.label}>Official Goods</p>
                    <h1 className={styles.title}>{settings.shop.title}</h1>
                    <p className={styles.sub}>{settings.shop.subtitle}</p>
                </div>

                <div className={styles.grid}>
                    {settings.products.map((product) => (
                        <article key={product.id} className={`glass ${styles.productCard}`}>
                            <div className={styles.productImgWrap}>
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    unoptimized
                                    className={styles.productImg}
                                />
                            </div>
                            <div className={styles.productBody}>
                                <h2 className={styles.productTitle}>{product.title}</h2>
                                <p className={styles.productDesc}>{product.description}</p>
                                <div className={styles.productFooter}>
                                    <span className={styles.price}>{product.price}</span>
                                </div>
                                {product.images.length > 0 && (
                                    <div className={styles.thumbs}>
                                        {product.images.map((img, i) => (
                                            <div key={i} className={styles.thumb}>
                                                <Image src={img} alt={`${product.title} view ${i + 1}`} fill unoptimized className={styles.thumbImg} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
