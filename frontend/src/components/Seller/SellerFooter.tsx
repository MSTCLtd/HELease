import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from 'flowbite-react'
import React from 'react'

export default function SellerFooter() {
    return (
        <Footer container className='shadow-none border-t-2'>
            <FooterCopyright href="#" by="Upkaran" year={2025} />
            <FooterLinkGroup>
                <FooterLink href="#">About</FooterLink>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Licensing</FooterLink>
                <FooterLink href="#">Contact</FooterLink>
            </FooterLinkGroup>
        </Footer>
    )
}
