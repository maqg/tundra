#!/usr/bin/python
# -*- coding: UTF-8 -*-

import socket
import struct
import fcntl

SIOCADDRT = 0x890B  # add routing table entry */
SIOCDELRT = 0x890C  # delete routing table entry */
SIOCRTMSG = 0x890D  # call to routing system */
SIOCGIFNAME = 0x8910  # get iface name  */
SIOCSIFLINK = 0x8911  # set iface channel  */
SIOCGIFCONF = 0x8912  # get iface list  */
SIOCGIFFLAGS = 0x8913  # get flags   */
SIOCSIFFLAGS = 0x8914  # set flags   */
SIOCGIFADDR = 0x8915  # get PA address  */
SIOCSIFADDR = 0x8916  # set PA address  */
SIOCGIFDSTADDR = 0x8917  # get remote PA address */
SIOCSIFDSTADDR = 0x8918  # set remote PA address */
SIOCGIFBRDADDR = 0x8919  # get broadcast PA address */
SIOCSIFBRDADDR = 0x891a  # set broadcast PA address */
SIOCGIFNETMASK = 0x891b  # get network PA mask  */
SIOCSIFNETMASK = 0x891c  # set network PA mask  */
SIOCGIFMETRIC = 0x891d  # get metric   */
SIOCSIFMETRIC = 0x891e  # set metric   */
SIOCGIFMEM = 0x891f  # get memory address (BSD) */
SIOCSIFMEM = 0x8920  # set memory address (BSD) */
SIOCGIFMTU = 0x8921  # get MTU size   */
SIOCSIFMTU = 0x8922  # set MTU size   */
SIOCSIFNAME = 0x8923  # set interface name  */
SIOCSIFHWADDR = 0x8924  # set hardware address  */
SIOCGIFENCAP = 0x8925  # get/set encapsulations       */
SIOCSIFENCAP = 0x8926
SIOCGIFHWADDR = 0x8927  # Get hardware address  */
SIOCGIFSLAVE = 0x8929  # Driver slaving support */
SIOCSIFSLAVE = 0x8930
SIOCADDMULTI = 0x8931  # Multicast address lists */
SIOCDELMULTI = 0x8932
SIOCGIFINDEX = 0x8933  # name -> if_index mapping */
SIOCSIFPFLAGS = 0x8934  # set/get extended flags set */
SIOCGIFPFLAGS = 0x8935
SIOCDIFADDR = 0x8936  # delete PA address  */
SIOCSIFHWBROADCAST = 0x8937 # set hardware broadcast addr */
SIOCGIFCOUNT = 0x8938  # get number of devices */
SIOCGIFBR = 0x8940  # Bridging support  */
SIOCSIFBR = 0x8941  # Set bridging options  */
SIOCGIFTXQLEN = 0x8942  # Get the tx queue length */
SIOCSIFTXQLEN = 0x8943  # Set the tx queue length  */
SIOCDARP = 0x8953  # delete ARP table entry */
SIOCGARP = 0x8954  # get ARP table entry  */
SIOCSARP = 0x8955  # set ARP table entry  */
SIOCDRARP = 0x8960  # delete RARP table entry */
SIOCGRARP = 0x8961  # get RARP table entry  */
SIOCSRARP = 0x8962  # set RARP table entry  */
SIOCGIFMAP = 0x8970  # Get device parameters */
SIOCSIFMAP = 0x8971  # Set device parameters */
SIOCADDDLCI = 0x8980  # Create new DLCI device */
SIOCDELDLCI = 0x8981  # Delete DLCI device  */
SIOCDEVPRIVATE = 0x89F0 # to 89FF */
SIOCPROTOPRIVATE = 0x89E0 # to 89EF */

DEBUG_IOCTL = 0

def get_iface_addr(ifname):
	sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
	if (sock == None):
		return None

	try:
		pkt = fcntl.ioctl(sock.fileno(), SIOCGIFADDR, struct.pack('256s', ifname[:15]))
	except:
		return "0.0.0.0"

	if (DEBUG_IOCTL == 1):
		data = ""
		for i in range(len(pkt)):
			hv = hex(ord(pkt[i])).replace("0x", "")
			data += str(hv)
		print(data)

	result = socket.inet_ntoa(pkt[20:24])

	return result

def get_iface_mask(ifname):
	sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
	if (sock == None):
		return None

	try:
		pkt = fcntl.ioctl(sock.fileno(), SIOCGIFNETMASK,
		                  struct.pack('256s', ifname[:15]))
	except:
		return "0.0.0.0"

	if (DEBUG_IOCTL == 1):
		data = ""
		for i in range(len(pkt)):
			hv = hex(ord(pkt[i])).replace("0x", "")
			data += str(hv)
		print(data)

	result = socket.inet_ntoa(pkt[20:24])

	return result

def get_iface_mac(ifname):
	sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
	if (sock == None):
		return None

	try:
		pkt = fcntl.ioctl(sock.fileno(), SIOCGIFHWADDR, struct.pack('256s', ifname[:15]))
	except:
		return "fe:ff:ff:ff:ff:ff"

	if (DEBUG_IOCTL == 1):
		data = ""
		for i in range(len(pkt)):
			hv = hex(ord(pkt[i])).replace("0x", "")
			data += str(hv)
		print(data)

	mac = ""
	for i in range(18,24):
		mac += "%02x:" % ord(pkt[i])

	return mac[:-1]

def get_iface_status(ifname):

	sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
	if (sock == None):
		return 0

	try:
		pkt = fcntl.ioctl(sock.fileno(), SIOCGIFFLAGS,
		                  struct.pack('256s', ifname[:15]))
	except:
		return 0

	if (DEBUG_IOCTL == 1):
		data = ""
		for i in range(len(pkt)):
			hv = hex(ord(pkt[i])).replace("0x", "")
			data += str(hv)
		print(data)

	flags, = struct.unpack("H", pkt[16:18])
	up = flags & 1

	if (int(up)):
		return 1
	else:
		return 0
