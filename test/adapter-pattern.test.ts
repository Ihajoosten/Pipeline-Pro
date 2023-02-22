import { IMessage } from "../src/adapter-pattern/interfaces/IMessage";
import { IMessagingAdapter } from "../src/adapter-pattern/interfaces/IMessagingAdapter";
import { IMessagingService } from "../src/adapter-pattern/interfaces/IMessagingService";
import { MessagingServiceAdapter } from "../src/adapter-pattern/message.adapter";
import { DiscordService } from "../src/adapter-pattern/services/discord.service";
import { EmailService } from "../src/adapter-pattern/services/email.service";
import { SlackService } from "../src/adapter-pattern/services/slack.service";
import { WhatsappService } from "../src/adapter-pattern/services/whatsapp.service";
import { Message } from "../src/models/message.model";

describe('DiscordService', () => {
  let service: IMessagingService;
  let message: IMessage = { sender: 'Erdem', content: 'what are you doing', recipient: 'Luc' };
  beforeEach(() => {
    service = new DiscordService("Discord");

  });

  it('should call sendMessage', () => {
    const mockSendMessage = jest.spyOn(service, 'sendMessage');

    service.sendMessage(message);
    expect(mockSendMessage).toHaveBeenCalled();
  });

  it('should have a name property of "Discord"', () => {
    expect(service).toBeInstanceOf(DiscordService);
  });

  // it('should throw an error if sendMessage is not implemented', () => {
  //   service = {} as IMessagingService;
  //   expect(() => service.sendMessage(null)).toThrow('Method not implemented.');
  // });

  it('should throw an error if sendMessage is called with no arguments', () => {
    expect(() => service.sendMessage(null)).toThrow('Invalid message.');
  });

  it('should throw an error if sendMessage is called with an invalid message', () => {
    let message: IMessage
    expect(() => service.sendMessage(message)).toThrow('Invalid message.');
  });
});

describe('SlackService', () => {
  let service: IMessagingService;
  let message: IMessage = { sender: 'Erdem', content: 'what are you doing', recipient: 'Luc' };

  beforeEach(() => {
    service = new SlackService("Slack");
  });

  it('should call sendMessage', () => {
    const mockSendMessage = jest.spyOn(service, 'sendMessage');
    service.sendMessage(message);
    expect(mockSendMessage).toHaveBeenCalledTimes(1);
  });

  it('should have a name property of "Slack"', () => {
    expect(service).toBeInstanceOf(SlackService);
  });

  // it('should throw an error if sendMessage is not implemented', () => {
  //   service = {} as IMessagingService;
  //   expect(() => service.sendMessage(null)).toThrow('Method not implemented.');
  // });

  it('should throw an error if sendMessage is called with no arguments', () => {
    let message: IMessage
    expect(() => service.sendMessage(message)).toThrow('Invalid message.');
  });

  it('should throw an error if sendMessage is called with an invalid message', () => {
    expect(() => service.sendMessage(null)).toThrow('Invalid message.');
  });
});

describe('EmailService', () => {
  let service: IMessagingService;
  let message: IMessage = { sender: 'Erdem', content: 'what are you doing', recipient: 'Luc' };

  beforeEach(() => {
    service = new EmailService("Email");
  });

  it('should call sendMessage', () => {
    const mockSendMessage = jest.spyOn(service, 'sendMessage');
    service.sendMessage(message);
    expect(mockSendMessage).toHaveBeenCalledTimes(1);
  });

  it('should have a name property of "Email"', () => {
    expect(service).toBeInstanceOf(EmailService);
  });

  // it('should throw an error if sendMessage is not implemented', () => {
  //   service = {} as IMessagingService;
  //   expect(() => service.sendMessage(null)).toThrow('Method not implemented.');
  // });
});

describe('WhatsappService', () => {
  let service: IMessagingService;
  let message: IMessage = { sender: 'Erdem', content: 'what are you doing', recipient: 'Luc' };

  beforeEach(() => {
    service = new WhatsappService("Whatsapp");
  });

  it('should call sendMessage', () => {
    const mockSendMessage = jest.spyOn(service, 'sendMessage');
    service.sendMessage(message);
    expect(mockSendMessage).toHaveBeenCalledTimes(1);
  });

  it('should have a name property of "WhatsApp"', () => {
    expect(service).toBeInstanceOf(WhatsappService);
  });

  // it('should throw an error if sendMessage is not implemented', () => {
  //   service = {} as IMessagingService;
  //   expect(() => service.sendMessage(null)).toThrow('Method not implemented.');
  // });

  it('should throw an error if sendMessage is called with no arguments', () => {
    expect(() => service.sendMessage(null)).toThrow('Invalid message.');
  });

  it('should throw an error if sendMessage is called with an invalid message', () => {
    let message: IMessage
    expect(() => service.sendMessage(message)).toThrow('Invalid message.');
  });
});

describe('MessagingServiceAdapter', () => {
  let emailAdapter: IMessagingAdapter;
  let discordAdapter: IMessagingAdapter
  let whatsappAdapter: IMessagingAdapter;
  let slackAdapter: IMessagingAdapter;
  let mockDiscordService: IMessagingService;
  let mockSlackService: IMessagingService;
  let mockEmailService: IMessagingService;
  let mockWhatsappService: IMessagingService;

  beforeEach(() => {
    mockDiscordService = {
      sendMessage: jest.fn(),
      name: 'Discord',
    };

    mockSlackService = {
      sendMessage: jest.fn(),
      name: 'Slack',
    };

    mockEmailService = {
      sendMessage: jest.fn(),
      name: 'Email',
    };

    mockWhatsappService = {
      sendMessage: jest.fn(),
      name: 'WhatsApp',
    };


    discordAdapter = new MessagingServiceAdapter(mockDiscordService);
    slackAdapter = new MessagingServiceAdapter(mockSlackService);
    whatsappAdapter = new MessagingServiceAdapter(mockWhatsappService);
    emailAdapter = new MessagingServiceAdapter(mockEmailService);

  });

  it('should call DiscordService.sendMessage if recipient starts with "@"', () => {
    const message = { sender: 'test', recipient: '@test', content: 'test' };
    discordAdapter.sendMessage(message);
    expect(mockDiscordService.sendMessage).toHaveBeenCalled();
  });

  it('should call SlackService.sendMessage if recipient starts with "#"', () => {
    const message = { sender: 'test', recipient: '#test', content: 'test' };
    slackAdapter.sendMessage(message);
    expect(mockSlackService.sendMessage).toHaveBeenCalled();
  });

  it('should call EmailService.sendMessage if recipient contains "@"', () => {
    const message = { sender: 'test', recipient: 'test@test.com', content: 'test' };
    emailAdapter.sendMessage(message);
    expect(mockEmailService.sendMessage).toHaveBeenCalled();
  });

  it('should call WhatsappService.sendMessage if recipient starts with "+"', () => {
    const message = { sender: 'test', recipient: '+1234567890', content: 'test' };
    whatsappAdapter.sendMessage(message);
    expect(mockWhatsappService.sendMessage).toHaveBeenCalled();
  });
});