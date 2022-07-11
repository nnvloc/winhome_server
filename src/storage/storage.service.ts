import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";


@Injectable()
export class StorageService {
  private storage;
  private NODE_ENV;
  private BUCKET;
  private ALC;
  private REGION;
  private readonly logger = new Logger(StorageService.name);
  constructor(
    private readonly configService: ConfigService,
  ) {
    const AWS_ACCESS_KEY = this.configService.get('AWS_ACCESS_KEY');
    const AWS_SECRET_KEY = this.configService.get('AWS_SECRET_KEY');
    this.REGION = this.configService.get('AWS_REGION');
    // this.BUCKET = 'beauty-salon-sg';
    this.BUCKET = 'learning-vapor-55';
    this.ALC = 'public-read';
    this.storage = new S3Client({
      credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
      },
      region: this.REGION,
    });
    this.NODE_ENV = this.configService.get('NODE_ENV');
  }

  preparePublicURL({
    bucket = this.BUCKET,
    key,
    group = '',
  }): string {
    let url = `https://${bucket}.s3.${this.REGION}.amazonaws.com/winhome`;
    if (group) {
      url += `/${group}`;
    }

    url += `/${key}`;
    return url;
  }

  prepareParams({
    bucket = this.BUCKET,
    ACL = this.ALC,
    key,
    body,
    group = '',
  }) : PutObjectCommand {
    let path = '';
    if (group) {
      path += `${group}/`;
    }

    path += `winhome/${key}`;

    return new PutObjectCommand({
      Bucket: bucket,
      ACL,
      Key: path,
      Body: body,
    });
  }

  async upload(obj: PutObjectCommand): Promise<any> {
    return this.storage.send(obj);
  }

  async getObject({
    key,
    bucket = this.BUCKET
  }): Promise<any> {
    // return this.storage.send(new GetObjectCommand({Key: key, Bucket: bucket}));
  }
}
