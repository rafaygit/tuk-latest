import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IntegrationTypes } from '@prisma/client';
import { TicketStatuses } from '@prisma/client';

@Injectable()
export class AnalyticsService {
	constructor(private prisma: PrismaService) {}

	async getAnalytics() {
		const usersCount = await this.prisma.users.count();
		const usersLicenseCount = await this.prisma.users.count({
			where: {
				licenses: {
					some: {
						id: {
							not: undefined
						}
					}
				}
			}
		});
		const componentsCount = await this.prisma.components.count();
		const uiKitsCount = await this.prisma.uiKits.count();
		// const transactionsCount = await this.prisma.transactions.count();
		const templatesCount = await this.prisma.templates.count();
		const cIAngular = await this.prisma.componentIntegrations.count({
			where: {
				type: IntegrationTypes.ANGULARJS
			}
		});
		const cIReact = await this.prisma.componentIntegrations.count({
			where: {
				type: IntegrationTypes.REACTJS
			}
		});
		const cIVue = await this.prisma.componentIntegrations.count({
			where: {
				type: IntegrationTypes.VUEJS
			}
		});
		const cIHTML = await this.prisma.componentIntegrations.count({
			where: {
				type: IntegrationTypes.HTML
			}
		});
		const tIAngular = await this.prisma.templateIntegrations.count({
			where: {
				type: IntegrationTypes.ANGULARJS
			}
		});
		const tIReact = await this.prisma.templateIntegrations.count({
			where: {
				type: IntegrationTypes.REACTJS
			}
		});
		const tIVue = await this.prisma.templateIntegrations.count({
			where: {
				type: IntegrationTypes.VUEJS
			}
		});
		const tIHTML = await this.prisma.templateIntegrations.count({
			where: {
				type: IntegrationTypes.HTML
			}
		});
		const ticketsCount = await this.prisma.tickets.count();
		const ticketsOpen = await this.prisma.tickets.count({
			where: {
				status: TicketStatuses.OPEN
			}
		});
		const ticketsResolved = await this.prisma.tickets.count({
			where: {
				status: TicketStatuses.RESOLVED
			}
		});
		const licenses = await this.prisma.licenses.findMany({
			take: 6
		});
		const licensesCount = await this.prisma.licenses.count();

		return {
			users: usersCount,
			components: componentsCount,
			uiKits: uiKitsCount,
			// transactions: transactionsCount,
			templates: templatesCount,
			componentsAngular: cIAngular,
			componentsReact: cIReact,
			componentsVue: cIVue,
			componentsHTML: cIHTML,
			templatesAngular: tIAngular,
			templatesReact: tIReact,
			templatesVue: tIVue,
			templatesHTML: tIHTML,
			totalTickets: ticketsCount,
			ticketsOpen: ticketsOpen,
			ticketsResolved: ticketsResolved,
			licensesCount: licensesCount,
			usersLicenseCount: usersLicenseCount,
			licenses: licenses
		};
	}
}
