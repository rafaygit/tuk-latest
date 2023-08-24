import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';

@Injectable()
export class LicensesService {
	constructor(private prisma: PrismaService) {}
	async create(createLicenseDto: CreateLicenseDto) {
		const { uiKits, ...licenseData } = createLicenseDto;
		
		const createdLicense = await this.prisma.licenses.create({
		data: {
			...licenseData,
			uiKits: {
			connect: uiKits?.map(id => ({ id })),
			},
		},
		include: {
			uiKits: true,
		},
		});

		return createdLicense;
		
	}

	async sumPriceByLicenseIds(licenseIds: number[]) {
		return this.prisma.licenses.aggregate({
			where: {
			  id: {
				in: licenseIds,
			  },
			},
			_sum: {
			  price: true,
			},
			
		})
	}

	async findManyBySelection(licenseIds: number[], selections: string[]) {
		let query = {}

		if (licenseIds.length) {
			query["where"] = {
				id: {
					in: licenseIds
				}
			}
		}
		
		if (selections.length) {
			query["select"] = {};
			selections.map(selection => {
				query["select"][selection] = true;
			});
		}

		return this.prisma.licenses.findMany(query)
	}

	findAll() {
		return this.prisma.licenses.findMany({
			include: {
				// transactions: true,
				uiKits: true
			}
		});
	}

	findOne(id: number) {
		return this.prisma.licenses.findUnique({
			where: {
				id: id
			},
			include: {
				// transactions: true,
				uiKits: true
			}
		});
	}
	async addUiKit(id: number, uiKitId: number) {
		return this.prisma.licenses.update({
			where: {
				id: id
			},
			data: {
				uiKits: {
					connect: { id: uiKitId }
				}
			}
		});
	}
	async removeUiKit(id: number, uiKitId: number) {
		return this.prisma.licenses.update({
			where: {
				id: id
			},
			data: {
				uiKits: {
					disconnect: { id: uiKitId }
				}
			}
		});
	}
	async update(id: number, updateLicenseDto: UpdateLicenseDto) {

		const { uiKits, ...licenseData } = updateLicenseDto;

			const updatedLicense = await this.prisma.licenses.update({
			where: { id },
			data: {
				...licenseData,
				uiKits: {
				connect: uiKits?.map(uiKitId => ({ id: uiKitId })),
				},
			},
				include: {
					uiKits: true,
				},
			});

			return updatedLicense;
		
	}

	remove(id: number) {
		return this.prisma.licenses.delete({
			where: {
				id: id
			}
		});
	}
}
