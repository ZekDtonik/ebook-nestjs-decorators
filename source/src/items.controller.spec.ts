import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './app.module';

describe('Items Controller Permission Tests e2e', () => {
  let app: INestApplication;
  let token: string;
  let jwtService: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    jwtService = moduleRef.get<JwtService>(JwtService);
    token = jwtService.sign({
      sub: 'userId',
      username: 'user1',
      permissions: ['view_items', 'edit_items'],
    });

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('Correct Credentials!', async function () {
    const result = await request(app.getHttpServer())
      //simula a propriedade do request.
      .get('/items')
      .set('authorization', 'Bearer ' + token)
      .expect(200)

    expect(result.text).toBe('This action return all items.')
  });

  it('Insufficient Credentials', async function () {
    token = jwtService.sign({
      sub: 'userId',
      username: 'user1',
      permissions: ['edit_items'],
    });

    const result = await request(app.getHttpServer())
      //simula a propriedade do request.
      .get('/items')
      .set('authorization', 'Bearer ' + token)
      .expect(403)
    expect(result.body.error).toBe('Forbidden')
  })

  afterAll(async () => {
    await app.close();
  });
});
