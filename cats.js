const axios = require('axios');

// LINE Notifyのアクセストークン
const accessToken = 'nc3CO2phw6XdQqOrEA4lcUsjbrOTeFfq2m6N08nl7is';

// ランダムな猫の画像を取得する関数
async function getRandomCatImage() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/images/search');
    const catImageUrl = response.data[0].url;
    return catImageUrl;
  } catch (error) {
    console.error('猫の画像の取得に失敗しました:', error.message);
    return null;
  }
}

// LINEに通知する関数
async function sendLineNotification(message, image) {
  try {
    const formData = new FormData();
    formData.append('message', message);
    formData.append('imageThumbnail', image);
    formData.append('imageFullsize', image);

    const response = await axios.post('https://notify-api.line.me/api/notify', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('LINEに通知しました:', response.data);
  } catch (error) {
    console.error('LINE通知の送信に失敗しました:', error.message);
  }
}

// ランダムな猫の画像を取得し、LINEに通知する処理を実行
async function notifyRandomCatImage() {
  const catImage = await getRandomCatImage();
  if (catImage) {
    sendLineNotification('今日もお疲れさま。ゆっくり休んでね！', catImage);
  }
}
//

// 関数を実行
notifyRandomCatImage();