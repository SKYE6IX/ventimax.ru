import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ArrowRight from "../icons/ArrowRight";
import "./product-card.scss";

type ProductCardProps = {
  id: string;
  imageSrc: string;
  title: string;
};

function ProductCard({ id, imageSrc, title }: ProductCardProps) {
  const t = useTranslations("Products");
  const linkText = useTranslations("CTA");
  return (
    <div className="product-card">
      <div className="product-card__bg-wrapper">
        <Image
          src="/background.png"
          alt="Background Image for product card"
          className="product-card__bg"
          height={470}
          width={398}
          data-testid="background-image"
        />
      </div>
      <div className="product-card__image-wrapper">
        <Image
          src={imageSrc}
          alt="Image of a product"
          fill
          className="product-card__image"
          data-testid="product-image"
        />
      </div>
      <div className="product-card__details-wrapper">
        <h3 className="product-card__details-title">{title}</h3>
        <p
          className="product-card__details-description"
          data-testid="product-description"
        >
          {t(`${id}.description`)}
        </p>
        <Link href={`products/${id}`} className="product-card__details-link">
          {linkText("linkText")}
          <span>
            <ArrowRight />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
