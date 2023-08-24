import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserRoles } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Roles } from 'src/auth/guard/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { AnalyticsService } from './analytics.service';
import {ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @ApiBearerAuth()
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  analytics() {
    return this.analyticsService.getAnalytics();
  }
}
