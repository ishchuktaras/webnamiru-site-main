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
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('HeroSection');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const trustSignals = [
    { icon: Users, text: t('trustSignal1') },
    { icon: TrendingUp, text: t('trustSignal2') },
    { icon: Award, text: t('trustSignal3') },
  ];

  return (
    <section 
      data-section="hero-section" 
      className={`relative w-full py-16 md:py-24 lg:py-32 xl:py-40 overflow-hidden ${isMounted ? "mounted" : ""}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25"></div>
      </div>

      <div className="relative container px-4 md:px-6 grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
          
          <div data-animate-item style={{ transitionDelay: '100ms' }}>
            <Badge className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-100 text-sm font-medium">
              <CheckCircle className="h-4 w-4" />
              {t('badge')}
            </Badge>
          </div>

          <div data-animate-item style={{ transitionDelay: '200ms' }}>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-300 dark:to-white bg-clip-text text-transparent">
                {t('title1')}
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {t('title2')}
              </span>
            </h1>
          </div>

          <div data-animate-item style={{ transitionDelay: '300ms' }}>
            <p 
              className="max-w-[600px] text-lg md:text-xl text-gray-600 dark:text-gray-300 mx-auto lg:mx-0 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t.raw('subtitle') }}
            />
          </div>

          <div data-animate-item style={{ transitionDelay: '400ms' }}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center lg:text-left">
              {trustSignals.map((signal, index) => (
                <div key={index} className="flex items-center justify-center lg:justify-start gap-2">
                  <signal.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{signal.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div data-animate-item style={{ transitionDelay: '500ms' }}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="group h-12 px-8 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-base font-medium" asChild>
                <Link href="/sluzby/balicky">
                  {t('cta_button1')}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" className="h-12 px-8 border-2 border-gray-300 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 text-base font-medium group" asChild>
                <Link href="/pripadove-studie">
                  {t('cta_button2')}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
          
        </div>
        
        <div data-animate-item style={{ transitionDelay: '300ms' }} className="hidden lg:block relative">
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            <Image
              src="/placeholder.svg"
              alt="Hero image"
              width={800}
              height={800}
              priority
              className="rounded-full shadow-2xl object-cover"
            />
            <div className="absolute inset-0 rounded-full ring-4 ring-blue-200/50 ring-offset-4 ring-offset-white dark:ring-offset-gray-900 animate-pulse-slow"></div>
          </div>
        </div>
      </div>
    </section>
  );
}