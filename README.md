# Welcome to your DR Home app 👋


## Get started

## Walktrhough Video
https://utfs.io/f/3LgkUbTOXVomGVS8wLUPlZq5dKUeWArSHiOX3j4JBw0fcVk8

## Contact
for any questions you can contact me on: mustafaumar70@live.com

## Pre-requisites
1. ios or android simulators

   ## Tech stack used
      1. Expo
      2. expo-router
      3. React Context API for state management
      4. stripe payment
      5. jest for unit test
         

1. Install dependencies

   ```bash
   yarn
   ```

2. Start the app

   ```bash
    yarn start
   ```
     ```bash
    Select s to switch to expo go
    ```
    ```bash
    select i for ios or a for android
    ```

3.   Run unit test
     ```bash
       yarn test
      ```

     ## Payment
i used stripe SDK to integrate the payment options
Apple pay on IOS and Google pay on android

payment card test details
1. card number: 4242 4242 4242 4242
2. MM/YY: 02/26
3. cvv: 123


![IMG_1730](https://github.com/user-attachments/assets/6534e262-56f5-454a-947a-e05d365a9155)
![IMG_1731](https://github.com/user-attachments/assets/92f9bcf4-d0c4-4873-9005-8f6588e1cd48)


## Running on real device

## OPTION 1

1. download expo go app from app store or google play store
2. sign in with my demo account username: musty, password: musty100
3. connect your device to the same wifi as your laptop or use a usb cable
4. run the app from you laptop and you will see it appear on your expo go app
5. tip: make sure your device is in light mode. Dark mode wasn't implemented in the prpject

## OPTION 2 
 using expo EAS
 1. login to the expo go app
 2. scroll down to the dr home project and open it
 3. p.s put your phone in light mode..i didn't handle dark mode theme in the project


https://github.com/user-attachments/assets/6978ccca-6714-40f8-a57d-8695f435c3e0




## CI/CD
![Screenshot 2024-12-12 at 15 39 23](https://github.com/user-attachments/assets/459e0311-9369-4cd7-8abd-ddba47757df3)


i setup a boilerplate yaml file which can be used to automate build process and app store submission

## Design system
   ![Screenshot 2024-12-12 at 15 42 05](https://github.com/user-attachments/assets/1e6268bb-1930-4b49-8f9b-0d975e7796d5)
   
   
   i made use of atomic design system. It follows the structure of an atom. Creating Themed components allows us to reuse components while maintaning the same look and feeel across the app

## EXPO EAS update

```bash
   Example can be seen in the running on a real device OPTION 2
```
![Screenshot 2024-12-12 at 15 39 57](https://github.com/user-attachments/assets/c0570a73-32f5-430d-af70-7ee67752e54b)


I included a sample expo eas config file. EAS is useful for OTA updates (This allows you release a new version of your app instantly). eas is also used for creating builds and submitting to the app store

## Error handling
![Screenshot 2024-12-12 at 15 41 35](https://github.com/user-attachments/assets/7c22cd5f-5240-4d66-9134-4dc72a645f6f)


I also included a global error handler. This helps to handle crashes safely and also sending the error to an error monitoring tool like sentry or even slack. This can help when the app goes to production to be notified whenver the app crashes




