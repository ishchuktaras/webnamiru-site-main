"use client"

import { useState } from "react"
import { Share2, Facebook, Twitter, Linkedin, LinkIcon, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface BlogSocialShareProps {
  title: string
  url: string
}

export default function BlogSocialShare({ title, url }: BlogSocialShareProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== "undefined" ? window.location.href : url
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(shareUrl)

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Sdílet
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4">
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Sdílet článek</h4>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => window.open(shareLinks.facebook, "_blank")}
            >
              <Facebook className="h-4 w-4 text-blue-600" />
              Facebook
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => window.open(shareLinks.twitter, "_blank")}
            >
              <Twitter className="h-4 w-4 text-blue-400" />
              Twitter
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => window.open(shareLinks.linkedin, "_blank")}
            >
              <Linkedin className="h-4 w-4 text-blue-700" />
              LinkedIn
            </Button>

            <Button variant="outline" size="sm" className="gap-2" onClick={copyToClipboard}>
              {copied ? <Check className="h-4 w-4 text-green-600" /> : <LinkIcon className="h-4 w-4" />}
              {copied ? "Zkopírováno" : "Kopírovat"}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
