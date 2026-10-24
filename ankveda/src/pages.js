// Privacy, Terms and Contact content (Marathi + English). Contact details come from config.js.
import {CONTACT as K,PRICE} from './config.js';
const P=PRICE, Pm=String(PRICE).replace(/\d/g,d=>'०१२३४५६७८९'[d]);

export const PAGES={
mr:{
 privacy:{title:'गोपनीयता नीती',sections:[
  {p:[`${K.business} वर तुमची माहिती कशी वापरली जाते आणि कशी सुरक्षित ठेवली जाते हे येथे सांगितले आहे. ही साइट वापरून तुम्ही या नीतीला मान्यता देता.`]},
  {h:'१. आम्ही कोणती माहिती घेतो',ul:[
   'पूर्ण नाव (इंग्रजी अक्षरांत) आणि जन्मतारीख, अहवाल तयार करण्यासाठी.',
   'जन्मवेळ आणि जन्मस्थान, फक्त तुम्ही दिले तर (ऐच्छिक) — कुंडली तयार करण्यासाठी.','WhatsApp नंबर, फक्त तुम्ही स्वतः दिला तर (ऐच्छिक).',
   'ऑर्डर आणि पेमेंटची नोंद: ऑर्डर क्रमांक, पेमेंट क्रमांक, रक्कम आणि स्थिती.',
   'तुमच्या ब्राउझरमध्ये भाषेची निवड आणि शेवटची ऑर्डर ओळख (local storage) साठवली जाते, जेणेकरून पेमेंटनंतर पान बंद झाले तरी तुम्हाला तुमचा अहवाल पुन्हा मिळू शकतो.']},
  {h:'२. मोफत तपासणी आणि खरेदी',p:['मोफत नावाची तपासणी तुमच्या ब्राउझरमध्येच होते; त्यासाठी तुम्ही दिलेले नाव आणि जन्मतारीख आमच्या सर्व्हरवर पाठवली जात नाही.','तुम्ही पूर्ण अहवाल खरेदी करायचे ठरवले तरच नाव, जन्मतारीख, (दिली असल्यास) जन्मवेळ आणि जन्मस्थान, तसेच WhatsApp नंबर आमच्या सर्व्हरवर पाठवला जातो आणि ऑर्डरसोबत साठवला जातो. आमच्या शहर-यादीत नसलेल्या जन्मस्थानाचे अक्षांश-रेखांश शोधण्यासाठी फक्त ते ठिकाणाचे नाव OpenStreetMap (Nominatim) सेवेकडे पाठवले जाऊ शकते; नाव किंवा जन्मतारीख नाही.']},
  {h:'३. माहिती कशासाठी वापरतो',ul:['तुमचा PDF अहवाल तयार करून देण्यासाठी.','पेमेंटची खात्री करण्यासाठी आणि ऑर्डरसंबंधी मदत करण्यासाठी.','कायदेशीर, कर आणि हिशेबाच्या गरजांसाठी.','तुम्ही WhatsApp नंबर दिला असेल तर फक्त तुमच्या ऑर्डरबद्दल संपर्क साधण्यासाठी.']},
  {h:'४. पेमेंट',p:['पेमेंट Razorpay या परवानाधारक पेमेंट गेटवेमार्फत होते. तुमचे कार्ड, UPI किंवा बँक तपशील आम्ही पाहत नाही आणि साठवत नाही; ते थेट Razorpay कडे जातात. Razorpay चे स्वतःचे गोपनीयता धोरण त्यांना लागू होते.']},
  {h:'५. माहिती कोणाला दिली जाते',p:['आम्ही तुमची माहिती कोणालाही विकत नाही. ती फक्त पेमेंट प्रक्रियेसाठी Razorpay सोबत, आमच्या होस्टिंग सेवेसोबत आणि कायद्याने बंधनकारक असल्यास सरकारी यंत्रणांसोबत शेअर केली जाऊ शकते.']},
  {h:'६. माहिती किती काळ ठेवतो',p:['ऑर्डरची नोंद हिशेब आणि कायदेशीर गरजांसाठी आवश्यक तोपर्यंत ठेवली जाते. तुम्हाला तुमचे नाव, जन्मतारीख, जन्मवेळ, जन्मस्थान आणि WhatsApp नंबर आमच्या नोंदीतून काढून टाकायचा असेल तर आम्हाला कळवा; कायद्याने ठेवणे आवश्यक असलेली नोंद वगळता ती काढली जाईल.']},
  {h:'७. सुरक्षा',p:['पेमेंट पडताळणी सर्व्हरवर होते आणि PDF फक्त पैसे भरलेल्या ऑर्डरसाठी, न ओळखता येणाऱ्या लिंकद्वारे दिला जातो. तरीही इंटरनेटवरील कोणतीही पद्धत १००% सुरक्षित असू शकत नाही, म्हणून आम्ही सुरक्षिततेची हमी देऊ शकत नाही, पण योग्य ती काळजी घेतो.']},
  {h:'८. तुमचे अधिकार',p:['तुम्ही तुमच्या माहितीची प्रत मागू शकता, चुकीची माहिती दुरुस्त करून घेऊ शकता किंवा ती काढून टाकण्याची विनंती करू शकता. त्यासाठी खालील ईमेलवर ऑर्डर क्रमांकासह संपर्क करा.']},
  {h:'९. लहान मुले',p:['ही सेवा १८ वर्षांखालील व्यक्तींसाठी नाही. पालकांच्या देखरेखीखालीच वापरा.']},
  {h:'१०. बदल आणि संपर्क',p:[`ही नीती बदलली तर नवीन तारखेसह या पानावर प्रसिद्ध केली जाईल. प्रश्न असल्यास ${K.email} वर लिहा.`,`शेवटचा बदल: ${K.updated.mr}`]},
 ]},
 terms:{title:'वापराच्या अटी',sections:[
  {p:[`${K.business} वापरून तुम्ही खालील अटी मान्य करता. मान्य नसतील तर कृपया सेवा वापरू नका.`]},
  {h:'१. सेवा काय आहे',p:['AnkVeda कॅल्डियन अंकशास्त्रावर आधारित नावाचा अंक, मूलांक आणि भाग्यांक काढून देते. मोफत तपासणीत नावाचा अंक आणि सुसंगतता दिसते. सशुल्क PDF अहवालात सविस्तर अर्थ, स्पेलिंगचे पर्याय आणि वैयक्तिक वर्षाची माहिती असते.']},
  {h:'२. हे भविष्य नाही',p:['अंकशास्त्र ही परंपरागत समजूत आहे; ती वैज्ञानिक तथ्य किंवा निश्चित भविष्य नाही. आमचा मजकूर फक्त माहिती आणि चिंतनासाठी आहे. तो आरोग्य, आर्थिक, कायदेशीर किंवा नातेसंबंधांबाबत सल्ला नाही आणि कोणत्याही निकालाची हमी देत नाही. कागदपत्रांवरील नाव बदलण्यासारखे मोठे निर्णय तुमचे स्वतःचे आहेत.']},
  {h:'३. किंमत आणि पेमेंट',ul:[`पूर्ण PDF अहवालाची किंमत ₹${Pm} आहे (पेमेंटच्या वेळी दिसणारी रक्कम अंतिम).`,'पेमेंट Razorpay द्वारे UPI QR, UPI अॅप, कार्ड किंवा नेटबँकिंगने करता येते.','किंमत सर्व्हरवर ठरते; ती ब्राउझरमध्ये बदलता येत नाही.']},
  {h:'४. अहवालाची डिलिव्हरी',p:['पेमेंटची खात्री झाल्यावर PDF लगेच याच पानावर डाउनलोडसाठी मिळतो. डाउनलोड न झाल्यास याच ब्राउझरमध्ये पान पुन्हा उघडून बटण दाबा, किंवा आम्हाला संपर्क करा.']},
  {h:'५. रद्द करणे आणि परतावा',p:['अहवाल डिजिटल असून पेमेंटनंतर लगेच दिला जात असल्याने, तो मिळाल्यानंतर परतावा दिला जात नाही. खालील प्रकरणांत मात्र पूर्ण परतावा दिला जाईल:'],ul:['पैसे कापले गेले पण अहवाल मिळाला नाही आणि आम्ही तो देऊ शकलो नाही.','एकाच ऑर्डरसाठी दोनदा पेमेंट झाले.','तांत्रिक बिघाडामुळे सदोष किंवा उघडता न येणारा PDF मिळाला.'],p2:['अशा विनंत्या ७ दिवसांत ईमेलवर ऑर्डर/पेमेंट क्रमांकासह कळवा. मंजूर परतावा मूळ पेमेंट पद्धतीत साधारण ५–७ कामकाजी दिवसांत जमा होतो.']},
  {h:'६. तुमची जबाबदारी',ul:['नाव इंग्रजी अक्षरांत आणि जन्मतारीख बरोबर भरा. चुकीच्या माहितीमुळे आलेला निकाल आम्ही बदलून देऊ शकत नाही.','सेवेचा गैरवापर, ऑटोमेटेड तपासणी किंवा सिस्टीमला अडथळा आणू नका.']},
  {h:'७. बौद्धिक संपदा',p:['साइटवरील मजकूर, रचना आणि अहवालाचा आराखडा AnkVeda चा आहे. तुम्ही मिळालेला अहवाल वैयक्तिक वापरासाठी ठेवू शकता; परवानगीशिवाय विक्री किंवा पुनर्वितरण करू नका.']},
  {h:'८. जबाबदारीची मर्यादा',p:['सेवा "आहे तशी" दिली जाते. कायद्याने परवानगी असलेल्या मर्यादेपर्यंत, या सेवेच्या वापरामुळे झालेल्या अप्रत्यक्ष नुकसानीसाठी आम्ही जबाबदार नाही. कोणत्याही प्रकरणात आमची जबाबदारी तुम्ही भरलेल्या रकमेपर्यंत मर्यादित राहील.']},
  {h:'९. लागू कायदा',p:['या अटींवर भारतीय कायदे लागू होतात आणि वाद भारतातील सक्षम न्यायालयांच्या कक्षेत येतील.']},
  {h:'१०. बदल',p:[`या अटी बदलल्या जाऊ शकतात; नवीन आवृत्ती या पानावर प्रसिद्ध होईल. शेवटचा बदल: ${K.updated.mr}`]},
 ]},
 contact:{title:'संपर्क',sections:[
  {p:['ऑर्डर, पेमेंट किंवा PDF बद्दल काही अडचण असल्यास आम्हाला कळवा. आम्ही साधारण २४ तासांत (कामकाजाच्या दिवशी) उत्तर देतो.']},
  {h:'मदत मागताना हे सोबत द्या',ul:['तुमचे नाव आणि ज्या नंबरने/ईमेलने पेमेंट केले ती माहिती.','ऑर्डर क्रमांक (order_...) आणि पेमेंट क्रमांक (pay_...), असल्यास.','पेमेंटचा स्क्रीनशॉट, पैसे कापले गेले असल्यास.']},
 ],card:true,labels:{email:'ईमेल',phone:'फोन',wa:'WhatsApp वर बोला',hours:'वेळ',addr:'पत्ता',pay:'पेमेंट किंवा परताव्याबाबत विषयात "Payment" लिहा.'}},
},
en:{
 privacy:{title:'Privacy Policy',sections:[
  {p:[`This page explains how ${K.business} uses and protects your information. By using this site you agree to this policy.`]},
  {h:'1. What we collect',ul:[
   'Your full name (in English letters) and date of birth, to prepare your report.',
   'Your birth time and birth place, only if you choose to give them (optional) — used to draw the kundali.','Your WhatsApp number, only if you choose to give it (optional).',
   'Order and payment records: order ID, payment ID, amount and status.',
   'Your language choice and last order ID are kept in your browser (local storage), so you can get your report again if you close the page after paying.']},
  {h:'2. Free check vs. purchase',p:['The free name check runs in your browser. The name and date of birth you type for it are not sent to our server.','Only if you decide to buy the full report are your name, date of birth, (if given) birth time and birth place, and WhatsApp number sent to our server and stored with the order. For a birth place that is not in our built-in city list, only the place name may be sent to the OpenStreetMap (Nominatim) service to find its coordinates; never your name or date of birth.']},
  {h:'3. How we use it',ul:['To create and deliver your PDF report.','To confirm your payment and help with your order.','To meet legal, tax and accounting requirements.','If you gave a WhatsApp number, only to contact you about your order.']},
  {h:'4. Payments',p:['Payments are handled by Razorpay, a licensed payment gateway. We never see or store your card, UPI or bank details; they go directly to Razorpay, whose own privacy policy applies.']},
  {h:'5. Who we share it with',p:['We do not sell your information. It may be shared only with Razorpay (to process payment), our hosting provider, and authorities where the law requires it.']},
  {h:'6. How long we keep it',p:['Order records are kept for as long as needed for accounting and legal purposes. If you want your name, date of birth, birth time, birth place and WhatsApp number removed from our records, write to us and we will remove them, except records the law requires us to keep.']},
  {h:'7. Security',p:['Payment verification happens on our server, and the PDF is released only for paid orders through an unguessable link. No method on the internet is 100% secure, so we cannot guarantee absolute security, but we take reasonable care.']},
  {h:'8. Your rights',p:['You may ask for a copy of your data, ask us to correct it, or ask us to delete it. Email us at the address below with your order ID.']},
  {h:'9. Children',p:['This service is not meant for people under 18. Please use it with a parent or guardian.']},
  {h:'10. Changes and contact',p:[`If we change this policy, the new version will be posted here with a new date. Questions: ${K.email}.`,`Last updated: ${K.updated.en}`]},
 ]},
 terms:{title:'Terms of Use',sections:[
  {p:[`By using ${K.business} you accept these terms. If you do not agree, please do not use the service.`]},
  {h:'1. What the service is',p:['AnkVeda works out your name number, Mulank and Bhagyank using Chaldean numerology. The free check shows your name number and how it fits your birth numbers. The paid PDF report adds detailed meanings, spelling options and your personal-year note.']},
  {h:'2. Not a prediction',p:['Numerology is a tradition-based belief, not scientific fact or a prediction of the future. Our content is for information and reflection only. It is not health, financial, legal or relationship advice and guarantees no outcome. Big decisions, such as changing your name on documents, are yours alone.']},
  {h:'3. Price and payment',ul:[`The full PDF report costs ₹${P} (the amount shown at payment is final).`,'You can pay through Razorpay by UPI QR, UPI app, card or net banking.','The price is set on our server and cannot be changed from the browser.']},
  {h:'4. Delivery',p:['Once payment is confirmed, the PDF is available to download immediately on the same page. If the download does not start, reopen the page in the same browser and press the button, or contact us.']},
  {h:'5. Cancellation and refunds',p:['The report is a digital product delivered immediately after payment, so it cannot be refunded once delivered. A full refund will be given in these cases:'],ul:['Money was deducted but you did not get the report and we could not deliver it.','You were charged twice for the same order.','A technical fault gave you a faulty PDF that cannot be opened.'],p2:['Report such cases within 7 days by email with your order or payment ID. Approved refunds go back to the original payment method, usually within 5–7 working days.']},
  {h:'6. Your responsibilities',ul:['Enter your name in English letters and your date of birth correctly. We cannot change a result caused by wrong input.','Do not misuse the service, run automated checks, or disrupt the system.']},
  {h:'7. Intellectual property',p:['The site content, design and report layout belong to AnkVeda. You may keep your report for personal use; do not resell or redistribute it without permission.']},
  {h:'8. Limit of liability',p:['The service is provided "as is". To the extent the law allows, we are not liable for indirect loss arising from use of the service, and our total liability is limited to the amount you paid.']},
  {h:'9. Governing law',p:['These terms are governed by the laws of India, and disputes fall under the competent courts in India.']},
  {h:'10. Changes',p:[`We may update these terms; the new version will be posted here. Last updated: ${K.updated.en}`]},
 ]},
 contact:{title:'Contact',sections:[
  {p:['If you have a problem with an order, a payment or your PDF, tell us. We usually reply within 24 hours on working days.']},
  {h:'Please include',ul:['Your name and the number/email used for payment.','Your order ID (order_...) and payment ID (pay_...), if you have them.','A screenshot of the payment if money was deducted.']},
 ],card:true,labels:{email:'Email',phone:'Phone',wa:'Chat on WhatsApp',hours:'Hours',addr:'Address',pay:'For payment or refund queries, write "Payment" in the subject.'}},
},
};