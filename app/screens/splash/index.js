import {
    View,
    Text,
  } from 'react-native';
  import React from 'react';
import Design from './design';

  const SplashScreen=()=>{

    const slides = [
        {
          key: 1,
          title: 'Welcome to FineX Cloud',
          title1: 'مرحبًا بك في فاين ايكس كلاود',
          text: 'Our team of developers warmly presents our comprehensive ERP business management mobile app for your desired ease.',
          text1:
            'يعرض فريق المطورين لدينا بحرارة تطبيق الجوال الشامل لإدارة ERP الخاصة بنا من أجل السهولة المطلوبة',
          image: require('../../assets/image/Layer-1.png'),
          backgroundColor: 'blue',
        },
        {
          key: 2,
          title: 'All in One',
          title1: 'الكل في واحد',
          text: 'The tool with all your necessary features and lets you manage all our ERP modules at the comfort of your palm.',
          text1:
            'الأداة مع جميع ميزاتك اللازمة وتتيح لك إدارة جميع وحدات ERP لدينا في راحة راحة يدك.',
          image: require('../../assets/image/Layer-2.png'),
          backgroundColor: 'blue',
        },
        {
          key: 3,
          title: 'Amazing Features',
          title1: 'ميزات مذهلة',
          text: 'All our modules come with much-needed support for your needs. We let you customize it as per need by contacting our team.',
          text1:
            'جميع وحداتنا تأتي مع دعم تمس الحاجة إليه لاحتياجاتك. نسمح لك بتخصيصها حسب الحاجة من خلال الاتصال بفريقنا.',
          image: require('../../assets/image/Layer-3.png'),
          backgroundColor: 'skyblue',
        },
      ];

    return(
     <Design
     slides={slides}/>
    )
  }

  export default SplashScreen;