import VerifyPage from '@/components/VerifyPage';
import { PageHero } from '@/components/v5';
export const metadata = { title: 'Product verify', description: 'Scratch off the verification label on the back of your Smyle Labs product and enter the code to check it is genuine.' };
export default function Page() { return <><PageHero small tag="Product verify" title={<>Is it real?<br />Check in seconds.</>} text="Every genuine Smyle Labs product has a scratch-off code on the back. Enter it below to make sure you got the real thing." /><VerifyPage /></>; }
