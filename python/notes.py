import csv

with open('notes.csv') as csv_file:
	csv_reader = csv.reader(csv_file, delimiter=',')
	line_count = 0
	prev_row = ''
	notes = '['
	freqs = '['
	for row in csv_reader:		
		note = row[0]
		freq = float(row[1])
		print(f'\t{note} is a frequency of {freq} Hz')
		notes += '"'+ note + '",'
		freqs += str(freq) + ', ';
		
		if prev_row != '':			
			prev_freq = float(prev_row[1])
			print(f'\tdifference: {freq - prev_freq} Hz')
			
		line_count += 1
		prev_row = row
	print(f'Processed {line_count} lines.')
	print(notes + ']')
	print(freqs + ']')