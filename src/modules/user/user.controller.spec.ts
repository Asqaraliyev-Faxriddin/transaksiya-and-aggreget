import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { registerDto, updatedDto, QueryDto } from './dto/user.dto';
import { BadRequestException } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockService = {
    Allusers: jest.fn(),
    AddUser: jest.fn(),
    UpdateUser: jest.fn(),
    remoweUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockService }],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });



  it('foydalanuvchi qoshadi', async () => {
    const payload: registerDto = {
      name: 'Vali',
      email: 'vali@gmail.com',
      phone: '998901112233',
      address: 'Toshkent',
      age: 25,
    };
    const expected = { id: 'abc', ...payload };
    mockService.AddUser.mockResolvedValue(expected);

    const result = await controller.create(payload);
    expect(service.AddUser).toHaveBeenCalledWith(payload);
    expect(result).toEqual(expected);
  });

  it('foydalanuvchini yangilaydi', async () => {
    const id = '123';
    const payload: updatedDto = {
      name: 'Hasan',
      phone: '998901112244',
      address: 'Samarqand',
    };
    const expected = { id, ...payload };
    mockService.UpdateUser = jest.fn().mockResolvedValue(expected);

    const result = await controller.updateUser(payload, id);
    expect(service.UpdateUser).toHaveBeenCalledWith(payload, id);
    expect(result).toEqual(expected);
  });

  it('foydalanuvchini ozchiradi', async () => {
    const id = '456';
    const mockResponse = {
      message: "Malumot o'chirildi",
      olduser: { id, name: 'Azam' },
    };
    mockService.remoweUser.mockResolvedValue(mockResponse);

    const result = await controller.deleteUser(id);
    expect(service.remoweUser).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockResponse);
  });
});
