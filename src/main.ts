import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import passport = require('passport');
// import {socketio} from 'socket.io'



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
//   // Add socket.io on your http server
// app.useWebSocketAdapter(new WsAdapter(app.getHttpServer()));
// // Connecting sockets to the server and adding them to the request
// // so that we can access them later in the controller
// const io = socketio(app.getHttpServer());

// app.set('io', io);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  await app.listen(3000);

 Logger.log('server running http://localhost:3000/');

//  app.use(passport.initialize());
// app.use(passport.session());
// app.use(expressSession({    
//   secret: 'SECRET_SESSION',    
//   resave: true,    
//   saveUninitialized: true,  
// }));
}
bootstrap();
