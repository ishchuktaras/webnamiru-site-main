"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const trustSignals = [
    { icon: Users, text: "Specializace na startupy" },
    { icon: TrendingUp, text: "Výhodné startovní ceny" },
    { icon: Award, text: "Ekonomické vzdělání + IT" },
  ];

  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 xl:py-40 overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25"></div>
      </div>

      {/* Content */}
      <div className="relative container px-4 md:px-6 grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        {/* Text Content */}
        <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
          {/* Badge */}
          <div
            className={`transform transition-all duration-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <Badge className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-100 text-sm font-medium">
              <CheckCircle className="h-4 w-4" />
              Výhodné podmínky pro začínající podnikatele
            </Badge>
          </div>

          {/* Main Heading */}
          <div
            className={`transform transition-all duration-700 delay-200 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-300 dark:to-white bg-clip-text text-transparent">
                Weby, které
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                vydělávají.
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div
            className={`transform transition-all duration-700 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <p className="max-w-[600px] text-lg md:text-xl text-gray-600 dark:text-gray-300 mx-auto lg:mx-0 leading-relaxed">
              Začínáte podnikat? Nabízím{" "}
              <span className="font-semibold text-blue-700 dark:text-blue-300">
                výhodné startovní podmínky
              </span>{" "}
              pro tvorbu profesionálních webů, které porostou s vaším byznysem
              na Vysočině.
            </p>
          </div>

          {/* Trust Signals */}
          <div
            className={`transform transition-all duration-700 delay-400 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center lg:text-left">
              {trustSignals.map((signal, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center lg:justify-start gap-2"
                >
                  <signal.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {signal.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className={`transform transition-all duration-700 delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                className="group h-12 px-8 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-base font-medium"
                asChild
              >
                <Link href="/kontakt">
                  Zjistit startovní podmínky
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                variant="outline"
                className="h-12 px-8 border-2 border-gray-300 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 text-base font-medium group"
                asChild
              >
                <Link href="/pripadove-studie">
                  Zobrazit případové studie
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Social Proof */}
          <div
            className={`transform transition-all duration-700 delay-600 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-green-600 border-2 border-white dark:border-gray-800 flex items-center justify-center text-white text-xs font-bold">
                    💡
                  </div>
                  <span>Ideální pro začínající podnikatele</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Content */}
        <div
          className={`transform transition-all duration-1000 delay-300 ${
            isVisible
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-8 opacity-0 scale-95"
          }`}
        >
          <div className="relative flex justify-center lg:justify-end">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl transform rotate-3 scale-105 opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl transform -rotate-2 scale-110 opacity-10"></div>

            {/* Main image */}
            <div className="relative z-0 max-w-lg mx-auto lg:max-w-none">
              <Image
                src="/placeholder.svg?height=600&width=600"
                width={600}
                height={600}
                alt="Profesionální fotografie - ekonom a webový vývojář analyzující obchodní grafy a webové metriky, symbolizující strategický přístup k tvorbě webů"
                className="relative w-full h-auto aspect-square overflow-hidden rounded-2xl object-cover shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105"
                priority
              />
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-xl z-10">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-bold text-green-600">
                    Startovní ceny
                  </span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-xl z-10">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-bold text-blue-600">
                    Pro startupy
                  </span>
                </div>
              </div>
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl transform rotate-3 scale-105 opacity-20 -z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl transform -rotate-2 scale-110 opacity-10 -z-20"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Schema.org structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Web na míru",
            description:
              "Strategické weby, které vydělávají pro firmy v Kraji Vysočina",
            url: "https://webnamiru.site",
            areaServed: {
              "@type": "State",
              name: "Kraj Vysočina",
            },
            founder: {
              "@type": "Person",
              name: "Taras Ishchuk",
              jobTitle: "Web Developer & Business Analyst",
            },
          }),
        }}
      />
    </section>
  );
}
